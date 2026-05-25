import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { RlsInterceptor } from 'src/database/rls/rls.interceptor';
import { AuthModule } from 'src/features/auth/auth.module';
import { DatabaseModule } from 'src/database/config/database.module';
import { CompaniesModule } from 'src/features/companies/companies.module';
import { UsersModule } from 'src/features/users/users.module';
import { MachinesModule } from 'src/features/machines/machines.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CompaniesModule,
    UsersModule,
    MachinesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: RlsInterceptor },
  ],
})
export class AppModule {}
