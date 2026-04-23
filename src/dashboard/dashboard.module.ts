import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Client } from '../clients/entities/client.entity';
import { InsuranceType } from '../insurance-types/entities/insurance-type.entity';
import { Policy } from '../policies/entities/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, InsuranceType, Policy])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
