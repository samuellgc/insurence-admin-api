import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmModuleAsyncConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.name'),
    schema: configService.get<string>('database.schema'),
    ssl: configService.get<boolean>('database.ssl')
      ? { rejectUnauthorized: false }
      : false,
    logging: configService.get<boolean>('database.logging'),
    autoLoadEntities: true,
    synchronize: false,
  }),
};
