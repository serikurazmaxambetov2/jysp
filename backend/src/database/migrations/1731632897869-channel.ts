import { MigrationInterface, QueryRunner } from 'typeorm';

export class Channel1731632897869 implements MigrationInterface {
  name = 'Channel1731632897869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel" ("id" bigint NOT NULL, "title" text NOT NULL, "link" text NOT NULL, CONSTRAINT "UQ_590f33ee6ee7d76437acf362e39" UNIQUE ("id"), CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "channel"`);
  }
}
