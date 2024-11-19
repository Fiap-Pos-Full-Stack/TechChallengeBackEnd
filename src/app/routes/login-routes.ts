import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { LoginController } from '../controllers/login.controller';
import { StudentRepository } from '../repositories/student.repository';

const loginRouter = Router();

loginRouter.post('/', new LoginController(new TeacherRepository(), new StudentRepository()).login);

export default loginRouter;