import { MigrationInterface, QueryRunner } from "typeorm";

export class renameTableColumn1663281227854 implements MigrationInterface {
    name = 'renameTableColumn1663281227854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME COLUMN "createdAt" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
