import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeProviderType1598993334893 implements MigrationInterface {
    name = 'ChangeProviderType1598993334893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."provider_type_enum"`);
        await queryRunner.query(`ALTER TABLE "provider" ADD "type" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."provider_type_enum" AS ENUM('LOCAL', 'GOOGLE')`);
        await queryRunner.query(`ALTER TABLE "provider" ADD "type" "provider_type_enum" NOT NULL`);
    }

}
