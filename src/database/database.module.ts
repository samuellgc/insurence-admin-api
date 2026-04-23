import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncConfig } from '../config/typeorm/typeorm.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleAsyncConfig)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
