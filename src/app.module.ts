import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { AppConfigModule } from './config/config.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { InsuranceTypesModule } from './insurance-types/insurance-types.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    ClientsModule,
    InsuranceTypesModule,
    PoliciesModule,
    DashboardModule,
  ],
})
export class AppModule {}
