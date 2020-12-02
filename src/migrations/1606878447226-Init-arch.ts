import {MigrationInterface, QueryRunner} from "typeorm";

export class InitArch1606878447226 implements MigrationInterface {
    name = 'InitArch1606878447226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "balance" integer NOT NULL DEFAULT 0, "address" character varying NOT NULL, "privateKey" character varying NOT NULL, "publicKey" character varying NOT NULL, "nonce" integer NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer, CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50), "login" character varying(50), "passwordHash" character varying, "role" "user_role_enum" NOT NULL DEFAULT 'user', "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "user" ("id", "firstName", "lastName", "login", "passwordHash", "role", "deleted", "createdAt", "updatedAt") VALUES (1, 'Mark', 'First', 'mark', '$2a$10$4T4xJDQH/WsHnaw/yPlD5uhPO39LD.76Wd38Dx4esoyhSAP1Tl56O', 'user', FALSE, NOW(), NOW());`)
        await queryRunner.query(`INSERT INTO "wallet" ("id", "name", "balance", "address", "privateKey", "publicKey", "nonce", "deleted", "createdAt", "updatedAt", "userId") VALUES (1, 'MarkWallet', 100000, '0x2EA157188F9aDD6Fb215eFf2de723C75e373894C', '0x669b46b2a113d6bd7fff600ecc7e5974dc4f7e96f723339e1db69ebb398a6594', '1314cc4f8507771bff3c43fe2dc6c71cb88510582324b19eab11d535724870189d10094a7f00e2fb9f61706a22a5bd60fb16b03a0a57961b7056321d257f8f0e', 0, FALSE, NOW(), NOW(), 1);`)
        await queryRunner.query(`INSERT INTO "user" ("id", "firstName", "lastName", "login", "passwordHash", "role", "deleted", "createdAt", "updatedAt") VALUES (2, 'Leon', 'Second', 'leon', '$2a$10$ALE1Cgf43VS3vEG25eNGN.L/lKOUK41N20kgAM/ZUjkGWVnnHARrW', 'user', FALSE, NOW(), NOW());`)
        await queryRunner.query(`INSERT INTO "wallet" ("id", "name", "balance", "address", "privateKey", "publicKey", "nonce", "deleted", "createdAt", "updatedAt", "userId") VALUES (2, 'LeonWallet', 500000, '0x5FC4F9918aA925c6E65715652d21042D38447F72', '0x41e55ee9cba3f00f78d9141bc167d93413f92b3d3b36fced1c149a51429b0462', '59ceca00c3e82873bf20ac53c50d0e0370170f1b5943a8ef560915eecb9e4e319b53a8fa892ba1caa465f637b5d93abb77aaf2d003299f8395475a06ec1d9018', 0, FALSE, NOW(), NOW(), 2);`)
        await queryRunner.query(`INSERT INTO "user" ("id", "firstName", "lastName", "login", "passwordHash", "role", "deleted", "createdAt", "updatedAt") VALUES (3, 'Andrew', 'Third', 'andrew', '$2a$10$TjWzv6fsyYL7rj6vk.TR5OLIMBt//UqXioqcFrVDqZR8T.qPeb4f6', 'user', FALSE, NOW(), NOW());`)
        await queryRunner.query(`INSERT INTO "wallet" ("id", "name", "balance", "address", "privateKey", "publicKey", "nonce", "deleted", "createdAt", "updatedAt", "userId") VALUES (3, 'AndrewWallet', 300000, '0xB435Ac593d76CA10044140248Cb74C3F156e8887', '0x5e6c5d058ce14549ef3530128dff8e3eab633c9dca37ad81024da3aa0ad2ab14', '9a83936a1796c0556084ca7e718aa27c7bcff6225b4c0f0b149d9c9ffcc87da5cfc811a695932cd1884c29a2c1feefc683193cb834fc4ee4b3fd568c11cbad50', 0, FALSE, NOW(), NOW(), 3);`)
        await queryRunner.query(`INSERT INTO "user" ("id", "firstName", "lastName", "login", "passwordHash", "role", "deleted", "createdAt", "updatedAt") VALUES (4, 'Admin', 'Admin', 'admin', '$2a$10$KRzdDnUm8cQC709pVJA9jOYi8a0ukem/3EGr4aPOLWmwUQPKBc54C', 'admin', FALSE, NOW(), NOW());`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
