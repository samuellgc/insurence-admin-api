import { NestFactory } from '@nestjs/core';
import { webcrypto } from 'node:crypto';

const DEFAULT_TEST_USER = {
  name: 'Admin',
  email: 'admin@insurance.com',
  password: '123456',
};

function getSeedUser() {
  return {
    name: process.env.SEED_TEST_USER_NAME?.trim() || DEFAULT_TEST_USER.name,
    email:
      process.env.SEED_TEST_USER_EMAIL?.trim().toLowerCase() ||
      DEFAULT_TEST_USER.email,
    password:
      process.env.SEED_TEST_USER_PASSWORD?.trim() || DEFAULT_TEST_USER.password,
  };
}

async function bootstrap() {
  if (!globalThis.crypto) {
    Object.defineProperty(globalThis, 'crypto', {
      value: webcrypto,
      configurable: true,
    });
  }

  const [{ AppModule }, { AuthModule }, { UsersModule }, { UsersService }] =
    await Promise.all([
      import('../../app.module'),
      import('../../auth/auth.module'),
      import('../../users/users.module'),
      import('../../users/services/users.service'),
    ]);

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const usersService = app
      .select(AuthModule)
      .select(UsersModule)
      .get(UsersService, { strict: true });

    const seedUser = getSeedUser();
    const existingUser = await usersService.findByEmail(seedUser.email);

    if (existingUser) {
      const updatedUser = await usersService.update(existingUser.id, {
        name: seedUser.name,
        password: seedUser.password,
      });

      console.log(`[seed] test user updated: ${updatedUser.email}`);
      return;
    }

    const createdUser = await usersService.create(seedUser);
    console.log(`[seed] test user created: ${createdUser.email}`);
  } catch (error) {
    console.error('[seed] failed to run development seed', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

void bootstrap();
