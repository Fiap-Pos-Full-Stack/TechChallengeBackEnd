import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';

import { teacherMiddleware,paramMiddleware } from '../middleware/auth';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { roles } from '../enums/roles';

const postRouter = Router();

postRouter.get('/', new PostController(new PostRepository(), new CommentRepository()).read);

postRouter.get('/admin', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).readTeacherPosts);

postRouter.get('/search', new PostController(new PostRepository(), new CommentRepository()).searchPosts)

postRouter.get('/:id', new PostController(new PostRepository(), new CommentRepository()).readId);

postRouter.post('/', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).create);

postRouter.put('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).update);

postRouter.delete('/:id', paramMiddleware([roles.TEACHER]),new PostController(new PostRepository(), new CommentRepository()).delete);

postRouter.post('/comment/:id',new PostController(new PostRepository(), new CommentRepository()).addPostComment);

export default postRouter;


