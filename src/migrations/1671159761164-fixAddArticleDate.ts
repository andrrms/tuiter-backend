import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAddArticleDate1671159761164 implements MigrationInterface {
    name = 'fixAddArticleDate1671159761164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_post" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "article_post" DROP COLUMN "created_at"`);
    }

}
