import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInitialData1722104440906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "teacher" (username, password, name) VALUES ('user', 'pass', 'name');`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM "teacher" WHERE username='userTeste';`
        );
    }

}
