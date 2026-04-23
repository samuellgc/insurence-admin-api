import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './env';
import { validateEnv } from './env/env.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: envConfig,
      validate: validateEnv,
      envFilePath: ['.env.local', '.env'],
      expandVariables: true,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
