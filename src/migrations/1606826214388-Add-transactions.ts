import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTransactions1606826214388 implements MigrationInterface {
    name = 'AddTransactions1606826214388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "wallet_currency_enum" AS ENUM('eth')`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "currency" "wallet_currency_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "currency"`);
        await queryRunner.query(`DROP TYPE "wallet_currency_enum"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
