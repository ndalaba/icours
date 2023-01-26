import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import User, { Token } from "./app/user/user.entity";
import { Course, Chapter } from './app/course/course.entity';
import { Subject } from './app/subject/subject.entity';
import * as dotenv from "dotenv"

dotenv.config()

const MODELS = [User, Token, Subject, Course, Chapter]

const sqliteOption: DataSourceOptions = {
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: MODELS,
    migrations: ['./build/migrations/*js'],
};

const mysqlOption: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV === "dev",
    entities: MODELS,
    migrations: ['./build/migrations/*js'],
    subscribers: [],
};

export default new DataSource(process.env.NODE_ENV === "test" ? sqliteOption : mysqlOption)