import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { authMiddleware } from '../middleware/auth';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';

const router = Router();

router.post('/login', new TeacherController(new TeacherRepository()).login);
router.get('/teste', authMiddleware,new TeacherController(new TeacherRepository()).teste);

router.get('/posts', new PostController(new PostRepository(), new CommentRepository()).read);

router.get('/posts/admin', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).readTeacherPosts);

router.get('/posts/search/', new PostController(new PostRepository(), new CommentRepository()).searchPosts)

router.get('/posts/:id', new PostController(new PostRepository(), new CommentRepository()).readId);

router.post('/posts', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).create);

router.put('/posts/:id', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).update);

router.delete('/posts/:id', authMiddleware,new PostController(new PostRepository(), new CommentRepository()).delete);

router.post('/posts/comment/:id',new PostController(new PostRepository(), new CommentRepository()).addPostComment);

export default router;