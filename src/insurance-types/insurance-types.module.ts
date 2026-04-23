import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InsuranceType } from './entities/insurance-type.entity';
import { InsuranceTypesController } from './controller/insurance-types.controller';
import { InsuranceTypesService } from './services/insurance-types.service';
import { Policy } from '../policies/entities/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceType, Policy])],
  controllers: [InsuranceTypesController],
  providers: [InsuranceTypesService],
  exports: [InsuranceTypesService, TypeOrmModule],
})
export class InsuranceTypesModule {}
