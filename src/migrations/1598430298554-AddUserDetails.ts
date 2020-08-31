import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserDetails1598430298554 implements MigrationInterface {
    name = 'AddUserDetails1598430298554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "token_type_enum" AS ENUM('VERIFY_EMAIL', 'RESET_PASSWORD')`);
        await queryRunner.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "type" "token_type_enum" NOT NULL, "token" character varying(32) NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "providerId" character varying, CONSTRAINT "UQ_d9959ee7e17e2293893444ea371" UNIQUE ("token"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_471d12169535445463a2f47f100" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_471d12169535445463a2f47f100"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TYPE "token_type_enum"`);
    }

}
