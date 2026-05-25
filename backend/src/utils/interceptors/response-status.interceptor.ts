import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable, map } from 'rxjs';
import type { ResponseApi } from '../models/responseApi.model';

@Injectable()
export class ResponseStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((body: unknown) => {
        if (isResponseApi(body)) {
          res.status(body.statusCode);
        }
        return body;
      }),
    );
  }
}

function isResponseApi(value: unknown): value is ResponseApi<unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ResponseApi<unknown>).statusCode === 'number'
  );
}
