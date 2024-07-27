import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreatePostTable1720664501470 } from './migrations/1720664501470-CreatePostTable';
import Post from "../app/entities/post.entity";
import * as dotenv from 'dotenv';
import { CreateUser1721928477312 } from "./migrations/1721928477312-CreateUser";
import User from "../app/entities/user.entity";
dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    //migrations: [CreatePostTable1720664501470,CreateUser1721928477312],
    subscribers: [],
})
