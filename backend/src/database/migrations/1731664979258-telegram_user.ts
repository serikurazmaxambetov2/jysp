import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelegramUser1731664979258 implements MigrationInterface {
  name = 'TelegramUser1731664979258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "telegram_user" ("id" bigint NOT NULL, "full_name" text NOT NULL, "username" text, CONSTRAINT "UQ_8e00b1def3edd3510248136f820" UNIQUE ("id"), CONSTRAINT "PK_8e00b1def3edd3510248136f820" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "owner_id" bigint`);
    await queryRunner.query(`ALTER TABLE "channel" ADD "owner_id" bigint`);
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "FK_bad207bc63adf962b5862dbc780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "UQ_f55da76ac1c3ac420f444d2ff11" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_d4144becee95503970b292336d5" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "FK_bad207bc63adf962b5862dbc780" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_033c6c164664caf44ca6199d63b" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel" DROP CONSTRAINT "FK_033c6c164664caf44ca6199d63b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "FK_bad207bc63adf962b5862dbc780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_d4144becee95503970b292336d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "UQ_f55da76ac1c3ac420f444d2ff11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "FK_bad207bc63adf962b5862dbc780" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "owner_id"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "owner_id"`);
    await queryRunner.query(`DROP TABLE "telegram_user"`);
  }
}
