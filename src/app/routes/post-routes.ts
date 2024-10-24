import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';

import { authMiddleware } from '../middleware/auth';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';

const postRouter = Router();

postRouter.get('/', new PostController(new PostRepository(), new CommentRepository()).read);

postRouter.get('/admin', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).readTeacherPosts);

postRouter.get('/search', new PostController(new PostRepository(), new CommentRepository()).searchPosts)

postRouter.get('/:id', new PostController(new PostRepository(), new CommentRepository()).readId);

postRouter.post('/', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).create);

postRouter.put('/:id', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).update);

postRouter.delete('/:id', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).delete);

postRouter.post('/comment/:id',new PostController(new PostRepository(), new CommentRepository()).addPostComment);

export default postRouter;