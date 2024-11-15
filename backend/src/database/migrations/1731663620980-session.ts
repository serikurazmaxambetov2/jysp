import { MigrationInterface, QueryRunner } from 'typeorm';

export class Session1731663620980 implements MigrationInterface {
  name = 'Session1731663620980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("id" bigint NOT NULL, "full_name" text NOT NULL, "session_string" text NOT NULL, "username" text NOT NULL, CONSTRAINT "UQ_f55da76ac1c3ac420f444d2ff11" UNIQUE ("id"), CONSTRAINT "UQ_6b7b5ae00bf389d9b84a403684b" UNIQUE ("session_string"), CONSTRAINT "UQ_1c92fe2c3b03cc3d0433fd550a4" UNIQUE ("username"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "session_id" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "UQ_dc838abbc317b4d31cdac346231" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "FK_bad207bc63adf962b5862dbc780" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "FK_bad207bc63adf962b5862dbc780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "UQ_dc838abbc317b4d31cdac346231"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "session_id"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
