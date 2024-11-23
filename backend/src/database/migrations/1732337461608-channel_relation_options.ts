import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChannelRelationOptions1732337461608 implements MigrationInterface {
  name = 'ChannelRelationOptions1732337461608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "use_formatting" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "use_ai" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "use_media" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "use_media_group" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "use_formatting"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "use_ai"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "use_media_group"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "use_media"`,
    );
  }
}
