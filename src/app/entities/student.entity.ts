import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn } from 'typeorm';
import Post from './post.entity';


@Entity('student')
export class Student {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    username: string;
    
    @Column('varchar', { length: 100, nullable: false })
    name: string;

    @Column('varchar', { length: 2000, nullable: false })
    password: string;


}

export default Student;