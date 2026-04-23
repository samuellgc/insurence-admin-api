import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from './entities/client.entity';
import { ClientsController } from './controller/clients.controller';
import { ClientsService } from './services/clients.service';
import { Policy } from '../policies/entities/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Policy])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
