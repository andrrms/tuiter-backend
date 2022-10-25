import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1664973421205 implements MigrationInterface {
    name = 'createTables1664973421205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_follows" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "following_id" uuid NOT NULL, "follower_id" uuid NOT NULL, CONSTRAINT "PK_086bec4d38aeb4c3fcc3535323b" PRIMARY KEY ("following_id", "follower_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "username" character varying(24) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(160) NOT NULL, "biography" character varying(160), "localization" character varying(30), "site" character varying(100), "birth_date" date NOT NULL, "avatar_url" character varying(350), "is_active" boolean NOT NULL DEFAULT true, "authorization_level" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying(240) NOT NULL, "localization" character varying(30) NOT NULL, "author_id" uuid, "article_quote_id" uuid, "article_reply_id" uuid, CONSTRAINT "REL_9c392d7e0d6c3bcca20d3ce21f" UNIQUE ("author_id"), CONSTRAINT "REL_6edc67d6012c52a1f9c26bc891" UNIQUE ("article_quote_id"), CONSTRAINT "REL_db85f132e339b2b99a6e297ca0" UNIQUE ("article_reply_id"), CONSTRAINT "PK_ce5968affb8e27896e7ae244bd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_likes" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "article_id" uuid NOT NULL, CONSTRAINT "PK_c972241ac936c238e2eedde44a8" PRIMARY KEY ("user_id", "article_id"))`);
        await queryRunner.query(`CREATE TABLE "article_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "media_hash" character varying(256), "media_url" character varying(350) NOT NULL, "mime_type" character varying(50) NOT NULL, "alt_text" character varying(1000), CONSTRAINT "PK_9ae22d87fc0b0a631d4adf4d799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_retweets" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "article_id" uuid NOT NULL, CONSTRAINT "PK_89ba7aed2cc24ce6fd9ff5b0fca" PRIMARY KEY ("user_id", "article_id"))`);
        await queryRunner.query(`ALTER TABLE "users_follows" ADD CONSTRAINT "FK_c6340ad1d41f7a14349aeef893a" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_follows" ADD CONSTRAINT "FK_8e554170ce7cf53b899dd21e004" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "FK_6edc67d6012c52a1f9c26bc891b" FOREIGN KEY ("article_quote_id") REFERENCES "article_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_post" ADD CONSTRAINT "FK_db85f132e339b2b99a6e297ca00" FOREIGN KEY ("article_reply_id") REFERENCES "article_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_likes" ADD CONSTRAINT "FK_ce2eccac655409f2318fe2d7478" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_likes" ADD CONSTRAINT "FK_78ef1e3144629e94df4e80baa34" FOREIGN KEY ("article_id") REFERENCES "article_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_retweets" ADD CONSTRAINT "FK_a832023644a472c232b65196138" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_retweets" ADD CONSTRAINT "FK_3ce5191361012de0cb2a7a4e591" FOREIGN KEY ("article_id") REFERENCES "article_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_retweets" DROP CONSTRAINT "FK_3ce5191361012de0cb2a7a4e591"`);
        await queryRunner.query(`ALTER TABLE "article_retweets" DROP CONSTRAINT "FK_a832023644a472c232b65196138"`);
        await queryRunner.query(`ALTER TABLE "article_likes" DROP CONSTRAINT "FK_78ef1e3144629e94df4e80baa34"`);
        await queryRunner.query(`ALTER TABLE "article_likes" DROP CONSTRAINT "FK_ce2eccac655409f2318fe2d7478"`);
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "FK_db85f132e339b2b99a6e297ca00"`);
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "FK_6edc67d6012c52a1f9c26bc891b"`);
        await queryRunner.query(`ALTER TABLE "article_post" DROP CONSTRAINT "FK_9c392d7e0d6c3bcca20d3ce21fa"`);
        await queryRunner.query(`ALTER TABLE "users_follows" DROP CONSTRAINT "FK_8e554170ce7cf53b899dd21e004"`);
        await queryRunner.query(`ALTER TABLE "users_follows" DROP CONSTRAINT "FK_c6340ad1d41f7a14349aeef893a"`);
        await queryRunner.query(`DROP TABLE "article_retweets"`);
        await queryRunner.query(`DROP TABLE "article_media"`);
        await queryRunner.query(`DROP TABLE "article_likes"`);
        await queryRunner.query(`DROP TABLE "article_post"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_follows"`);
    }

}
