import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelRelation1731722945383 implements MigrationInterface {
    name = 'ChannelRelation1731722945383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel_relation" DROP CONSTRAINT "PK_dc838abbc317b4d31cdac346231"`);
        await queryRunner.query(`ALTER TABLE "channel_relation" DROP CONSTRAINT "UQ_dc838abbc317b4d31cdac346231"`);
        await queryRunner.query(`ALTER TABLE "channel_relation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "channel_relation" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "channel_relation" ADD CONSTRAINT "PK_dc838abbc317b4d31cdac346231" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_033c6c164664caf44ca6199d63b"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_d4144becee95503970b292336d5"`);
        await queryRunner.query(`ALTER TABLE "telegram_user" ADD CONSTRAINT "UQ_8e00b1def3edd3510248136f820" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_d4144becee95503970b292336d5" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_033c6c164664caf44ca6199d63b" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_033c6c164664caf44ca6199d63b"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_d4144becee95503970b292336d5"`);
        await queryRunner.query(`ALTER TABLE "telegram_user" DROP CONSTRAINT "UQ_8e00b1def3edd3510248136f820"`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_d4144becee95503970b292336d5" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_033c6c164664caf44ca6199d63b" FOREIGN KEY ("owner_id") REFERENCES "telegram_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "channel_relation" DROP CONSTRAINT "PK_dc838abbc317b4d31cdac346231"`);
        await queryRunner.query(`ALTER TABLE "channel_relation" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "channel_relation" ADD "id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "channel_relation" ADD CONSTRAINT "UQ_dc838abbc317b4d31cdac346231" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "channel_relation" ADD CONSTRAINT "PK_dc838abbc317b4d31cdac346231" PRIMARY KEY ("id")`);
    }

}
