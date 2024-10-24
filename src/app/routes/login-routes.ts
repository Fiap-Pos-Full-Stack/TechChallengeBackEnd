import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { authMiddleware } from '../middleware/auth';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';

const loginRouter = Router();

loginRouter.post('/', new TeacherController(new TeacherRepository()).login);

export default loginRouter;