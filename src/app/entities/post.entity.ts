import { Entity, Column, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, BeforeInsert, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import Teacher from './teacher.entity';
import Comment from './comment.entity';


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('varchar', { length: 100, nullable: false })
    title: string;

    @Column('varchar', { length: 2000, nullable: false })
    description: string;
    
    @Column('varchar', { length: 2000, nullable: false })
    author: string;

    @CreateDateColumn()
    created: Date; // Creation date

    
    @ManyToOne(() => Teacher, (teacher) => teacher.posts)
    teacher: Teacher

    @OneToMany(() => Comment, (comments) => comments.post)
    comments: Comment[]

}

export default Post;