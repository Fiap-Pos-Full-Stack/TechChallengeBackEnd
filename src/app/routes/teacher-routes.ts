import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { TeacherController } from '../controllers/teacher.controller';
import {TeacherRepository } from '../repositories/teacher.repository';
import { authMiddleware } from '../middleware/auth';

const teacherRouter = Router();

teacherRouter.get('/', authMiddleware,new TeacherController(new TeacherRepository()).readAll);
teacherRouter.get('/:id',authMiddleware,new TeacherController(new TeacherRepository()).readId);

teacherRouter.put('/:id', authMiddleware,new TeacherController(new TeacherRepository()).update);

teacherRouter.delete('/:id', authMiddleware,new TeacherController(new TeacherRepository()).delete);

teacherRouter.post('/',authMiddleware,new TeacherController(new TeacherRepository()).create);

export default teacherRouter;