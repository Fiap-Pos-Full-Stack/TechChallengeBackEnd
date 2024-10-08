import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostTable1721928477312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'post',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '2000',
                        isNullable: false
                    },
                    {
                        name: 'created',
                        type: 'timestamptz',
                        isNullable: false
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'teacherId',
                        type: 'serial',
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'post',
            new TableForeignKey({
              columnNames: ['teacherId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'teacher',
              onDelete:'CASCADE'
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post')
    }

}
