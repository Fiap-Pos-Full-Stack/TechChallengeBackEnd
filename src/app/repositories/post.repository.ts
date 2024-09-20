import { Teacher } from './../entities/teacher.entity';
import Post from "../entities/post.entity";
import IPost from "../interfaces/IPost";
import { AppDataSource } from "../../database/data-source";
import { ILike } from "typeorm";

export class PostRepository {
    private repository = AppDataSource.getRepository(Post);

    getPosts = (): Promise<IPost[]> => {
        return this.repository.find({
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
            order: {created: "DESC"}
        });
    }
    getPostById = (id: number): Promise<IPost | null> => {
        return this.repository.findOne({
            where: { id },
            relations: { teacher: true,comments:true },
            select: { teacher: { username: true, id: true } },
            order: {comments: {created:"DESC"}}
            
        });
    };
    getPostByTeacherId = (id: number): Promise<IPost[] | null> => {
        return this.repository.find({
            where: { teacher: { id } },
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
            order: {created: "DESC"}
        });
    };
    createPost = async (post: IPost): Promise<IPost> => {
        const {
            title,
            description,
            created,
            author
        } = post
        const newPost = this.repository.create({
            title,
            description,
            author:author,
            created:created,
            teacher: { id: post.teacher.id }
        });
        return await this.repository.save(newPost);
    };
    updatePost = async (id: number, userId :number,updatedData: Partial<IPost>): Promise<IPost | null> => {
        await this.repository.update(id, updatedData);
        const updatedPost = await this.repository.findOne({ where: { id } });
        if (updatedPost != null) {
            this.repository.merge(updatedPost, updatedData);
            const res = this.repository.save(updatedPost);
            return res;
        }
        return null

    };

    deletePost = async (id: number,userId :number): Promise<boolean> => {
        
        const deleteResult = await this.repository.delete(id);
        return deleteResult.affected !== 0;
    };

    searchInPosts = (worlds: string): Promise<IPost[]> => {
        if(!worlds)
        {
            return this.getPosts()
        }
        return this.repository.find({
            where: [{ title: ILike(`%${worlds}%`) }, { description: ILike(`%${worlds}%`) }, { author: ILike(`%${worlds}%`) }],
            relations: { teacher: true, },
            select: { teacher: { username: true, id: true } },
            order: {created: "DESC"}
        });
    }


}

export default {
    PostRepository
};