import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCredsToUserWallets1606829051125 implements MigrationInterface {
    name = 'AddCredsToUserWallets1606829051125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "privateKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "publicKey" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "publicKey"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "privateKey"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "address"`);
    }

}
