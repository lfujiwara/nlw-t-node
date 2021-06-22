import { MigrationInterface, QueryRunner } from "typeorm";

export class init1624322888489 implements MigrationInterface {
  name = "init1624322888489";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "db_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ec0114755ef7e24f1dacd7ff0d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "db_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_ab99abfe85e27a335ab4045de11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "db_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL, CONSTRAINT "UQ_bd6af07b6bf30ebbb792d2271ae" UNIQUE ("email"), CONSTRAINT "PK_a1f78886c8b8b51ef54ce7cc87c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "db_compliment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "receiverId" uuid, "tagId" uuid, CONSTRAINT "PK_aebee8a011dd556c2cbc0e0c871" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "db_compliment" ADD CONSTRAINT "FK_b4e84a318183de81d3158eb5577" FOREIGN KEY ("senderId") REFERENCES "db_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "db_compliment" ADD CONSTRAINT "FK_2b0f427ecc8a315072c6433915d" FOREIGN KEY ("receiverId") REFERENCES "db_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "db_compliment" ADD CONSTRAINT "FK_87de9d5b159220525cec0818df5" FOREIGN KEY ("tagId") REFERENCES "db_tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "db_compliment" DROP CONSTRAINT "FK_87de9d5b159220525cec0818df5"`
    );
    await queryRunner.query(
      `ALTER TABLE "db_compliment" DROP CONSTRAINT "FK_2b0f427ecc8a315072c6433915d"`
    );
    await queryRunner.query(
      `ALTER TABLE "db_compliment" DROP CONSTRAINT "FK_b4e84a318183de81d3158eb5577"`
    );
    await queryRunner.query(`DROP TABLE "db_compliment"`);
    await queryRunner.query(`DROP TABLE "db_user"`);
    await queryRunner.query(`DROP TABLE "db_tag"`);
    await queryRunner.query(`DROP TABLE "db_entity"`);
  }
}
