import Teacher from "../../app/entities/teacher.entity";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTeacher1720664501470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'teacher',
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teacher')
    }

}
