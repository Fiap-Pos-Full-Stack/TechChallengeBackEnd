import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routers from './app/routes/login-routes';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./app/config/swagger_output.json";
import postRouter from './app/routes/post-routes';
import teacherRouter from './app/routes/teacher-routes';
import loginRouter from './app/routes/login-routes';
import studentRouter from './app/routes/student-routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/posts',postRouter);
app.use('/teacher',teacherRouter);
app.use('/student',studentRouter);
app.use('/login',loginRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));


export default app;