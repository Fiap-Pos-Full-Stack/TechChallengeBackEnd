import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { StudentController } from '../controllers/student.controller';
import {StudentRepository } from '../repositories/student.repository';
import { authMiddleware } from '../middleware/auth';

const studentRouter = Router();

studentRouter.get('/', authMiddleware,new StudentController(new StudentRepository()).readAll);
studentRouter.get('/:id',authMiddleware,new StudentController(new StudentRepository()).readId);

studentRouter.put('/:id', authMiddleware,new StudentController(new StudentRepository()).update);

studentRouter.delete('/:id', authMiddleware,new StudentController(new StudentRepository()).delete);

studentRouter.post('/',authMiddleware,new StudentController(new StudentRepository()).create);

export default studentRouter;