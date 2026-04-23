import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Policy } from './entities/policy.entity';
import { Client } from '../clients/entities/client.entity';
import { InsuranceType } from '../insurance-types/entities/insurance-type.entity';
import { PoliciesController } from './controller/policies.controller';
import { PoliciesService } from './services/policies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Policy, Client, InsuranceType])],
  controllers: [PoliciesController],
  providers: [PoliciesService],
  exports: [PoliciesService, TypeOrmModule],
})
export class PoliciesModule {}
