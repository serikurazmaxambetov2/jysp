import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChannelRelation1731662938019 implements MigrationInterface {
  name = 'ChannelRelation1731662938019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel_relation" ("id" bigint NOT NULL, "display_name" text, "from_channel_id" bigint, "to_channel_id" bigint, CONSTRAINT "UQ_dc838abbc317b4d31cdac346231" UNIQUE ("id"), CONSTRAINT "PK_dc838abbc317b4d31cdac346231" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "UQ_590f33ee6ee7d76437acf362e39" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "FK_f97f28797198ac44ecb717baee9" FOREIGN KEY ("from_channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD CONSTRAINT "FK_5f94496bb7bc6442a6229670006" FOREIGN KEY ("to_channel_id") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "FK_5f94496bb7bc6442a6229670006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP CONSTRAINT "FK_f97f28797198ac44ecb717baee9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel" DROP CONSTRAINT "UQ_590f33ee6ee7d76437acf362e39"`,
    );
    await queryRunner.query(`DROP TABLE "channel_relation"`);
  }
}
