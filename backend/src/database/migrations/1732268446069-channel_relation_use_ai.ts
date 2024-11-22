import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChannelRelationUseAi1732268446069 implements MigrationInterface {
  name = 'ChannelRelationUseAi1732268446069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" ADD "use_ai" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_relation" DROP COLUMN "use_ai"`,
    );
  }
}
