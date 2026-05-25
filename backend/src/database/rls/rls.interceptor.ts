import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { Request } from 'express';
import { Observable, from, lastValueFrom } from 'rxjs';
import { DataSource } from 'typeorm';
import { JwtPayload } from 'src/utils/guards/jwt-auth.guard';
import { rlsStorage } from './rls.context';

@Injectable()
export class RlsInterceptor implements NestInterceptor {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload & { userId?: string } }>();
    const user = req.user;
    const role = user?.role ?? 'SYSTEM';
    const companyId = user?.companyId ?? '';

    const run = this.dataSource.transaction(
      async (manager): Promise<unknown> => {
        await manager.query(
          `SELECT set_config('app.current_user_role', $1, true)`,
          [role],
        );
        await manager.query(
          `SELECT set_config('app.current_user_company_id', $1, true)`,
          [companyId],
        );
        return rlsStorage.run({ manager }, () =>
          lastValueFrom(next.handle() as Observable<unknown>),
        );
      },
    );

    return from(run);
  }
}
