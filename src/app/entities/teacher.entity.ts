import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn } from 'typeorm';
import Post from './post.entity';


@Entity('teacher')
export class Teacher {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    username: string;

    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 2000, nullable: false })
    password: string;

    @OneToMany(() => Post, (post) => post.teacher)
    posts: Post[]

}

export default Teacher;