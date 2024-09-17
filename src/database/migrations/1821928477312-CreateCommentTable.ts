import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentTable1821928477312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comment',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'comentary',
                        type: 'varchar',
                        length: '5000',
                        isNullable: false
                    },
                    {
                        name: 'created',
                        type: 'timestamptz',
                        isNullable: false
                    },
                    {
                        name: 'postId',
                        type: 'serial',
                        isNullable: false
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'comment',
            new TableForeignKey({
              columnNames: ['postId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'post',
              onDelete:'CASCADE'
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comment')
    }

}
