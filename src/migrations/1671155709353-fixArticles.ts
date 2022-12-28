import { MigrationInterface, QueryRunner } from "typeorm";

export class fixArticles1671155709353 implements MigrationInterface {
    name = 'fixArticles1671155709353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa"`);
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "REL_9c392d7e0d6c3bcca20d3ce21f"`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa"`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "REL_9c392d7e0d6c3bcca20d3ce21f" UNIQUE ("author_id")`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
