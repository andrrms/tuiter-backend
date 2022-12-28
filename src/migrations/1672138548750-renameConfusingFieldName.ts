import { MigrationInterface, QueryRunner } from "typeorm";

export class renameConfusingFieldName1672138548750 implements MigrationInterface {
    name = 'renameConfusingFieldName1672138548750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows" DROP CONSTRAINT "FK_c6340ad1d41f7a14349aeef893a"`);
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME COLUMN "following_id" TO "target_id"`);
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME CONSTRAINT "PK_086bec4d38aeb4c3fcc3535323b" TO "PK_1715b22cdf0c4cfc0ab91888579"`);
        await queryRunner.query(`ALTER TABLE "users_follows" ADD CONSTRAINT "FK_d6c29285d029d0c192098eb4803" FOREIGN KEY ("target_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows" DROP CONSTRAINT "FK_d6c29285d029d0c192098eb4803"`);
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME CONSTRAINT "PK_1715b22cdf0c4cfc0ab91888579" TO "PK_086bec4d38aeb4c3fcc3535323b"`);
        await queryRunner.query(`ALTER TABLE "users_follows" RENAME COLUMN "target_id" TO "following_id"`);
        await queryRunner.query(`ALTER TABLE "users_follows" ADD CONSTRAINT "FK_c6340ad1d41f7a14349aeef893a" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
