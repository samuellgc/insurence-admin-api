import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await queryRunner.query(`
      CREATE TYPE "clients_status_enum" AS ENUM ('ACTIVE', 'INACTIVE')
    `);
    await queryRunner.query(`
      CREATE TYPE "insurance_types_category_enum" AS ENUM (
        'AUTO',
        'LIFE',
        'HOME',
        'BUSINESS',
        'TRAVEL'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "policies_status_enum" AS ENUM (
        'PENDING',
        'ACTIVE',
        'CANCELED',
        'EXPIRED'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "name" VARCHAR(120) NOT NULL,
        "email" VARCHAR(180) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_users_email" ON "users" ("email")
    `);

    await queryRunner.query(`
      CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "name" VARCHAR(150) NOT NULL,
        "cpf" VARCHAR(14) NOT NULL,
        "email" VARCHAR(180) NOT NULL,
        "phone" VARCHAR(20) NOT NULL,
        "birth_date" DATE,
        "cep" VARCHAR(9),
        "street" VARCHAR(180),
        "number" VARCHAR(20),
        "district" VARCHAR(120),
        "city" VARCHAR(120),
        "state" CHAR(2),
        "status" "clients_status_enum" NOT NULL DEFAULT 'ACTIVE',
        CONSTRAINT "PK_clients_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_clients_cpf" ON "clients" ("cpf")
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_clients_email" ON "clients" ("email")
    `);

    await queryRunner.query(`
      CREATE TABLE "insurance_types" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "name" VARCHAR(120) NOT NULL,
        "category" "insurance_types_category_enum" NOT NULL,
        "description" TEXT,
        "base_value" NUMERIC(12, 2) NOT NULL,
        "active" BOOLEAN NOT NULL DEFAULT true,
        CONSTRAINT "PK_insurance_types_id" PRIMARY KEY ("id"),
        CONSTRAINT "chk_insurance_types_base_value_positive" CHECK ("base_value" > 0)
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_insurance_types_name" ON "insurance_types" ("name")
    `);

    await queryRunner.query(`
      CREATE TABLE "policies" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "policy_number" VARCHAR(50) NOT NULL,
        "monthly_value" NUMERIC(12, 2) NOT NULL,
        "coverage_value" NUMERIC(14, 2) NOT NULL,
        "start_date" DATE NOT NULL,
        "end_date" DATE NOT NULL,
        "status" "policies_status_enum" NOT NULL DEFAULT 'PENDING',
        "client_id" uuid NOT NULL,
        "insurance_type_id" uuid NOT NULL,
        CONSTRAINT "PK_policies_id" PRIMARY KEY ("id"),
        CONSTRAINT "chk_policies_end_date_after_start_date" CHECK ("end_date" > "start_date"),
        CONSTRAINT "chk_policies_monthly_value_positive" CHECK ("monthly_value" > 0),
        CONSTRAINT "chk_policies_coverage_value_positive" CHECK ("coverage_value" > 0),
        CONSTRAINT "FK_policies_client_id" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_policies_insurance_type_id" FOREIGN KEY ("insurance_type_id") REFERENCES "insurance_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_policies_policy_number" ON "policies" ("policy_number")
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_policies_client_id" ON "policies" ("client_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_policies_insurance_type_id" ON "policies" ("insurance_type_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."idx_policies_insurance_type_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_policies_client_id"`);
    await queryRunner.query(`DROP INDEX "public"."uq_policies_policy_number"`);
    await queryRunner.query(`DROP TABLE "policies"`);

    await queryRunner.query(`DROP INDEX "public"."uq_insurance_types_name"`);
    await queryRunner.query(`DROP TABLE "insurance_types"`);

    await queryRunner.query(`DROP INDEX "public"."uq_clients_email"`);
    await queryRunner.query(`DROP INDEX "public"."uq_clients_cpf"`);
    await queryRunner.query(`DROP TABLE "clients"`);

    await queryRunner.query(`DROP INDEX "public"."uq_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`DROP TYPE "public"."policies_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."insurance_types_category_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."clients_status_enum"`);
  }
}
