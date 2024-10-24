import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudent1920664501470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'student',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '200',
                        isNullable: false
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('student')
    }

}
