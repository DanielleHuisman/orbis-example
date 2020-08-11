import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1597156677866 implements MigrationInterface {
    name = 'Initial1597156677866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "provider_type_enum" AS ENUM('LOCAL', 'GOOGLE')`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" character varying NOT NULL, "type" "provider_type_enum" NOT NULL, "identifier" character varying(255) NOT NULL, "credentials" text NOT NULL, "email" character varying(255) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "userId" character varying, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_da1c78142007c621b5498c818c1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_da1c78142007c621b5498c818c1"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TYPE "provider_type_enum"`);
    }

}
