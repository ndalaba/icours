import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import User, {Token} from "./app/user/user.entity";
import Subject from './app/subject/subject.entity';
import * as dotenv from "dotenv"
import Classe from "./app/classes/classe.entity";
import Course from "./app/course/entity/course.entity";
import Chapter from "./app/course/entity/chapter.entity";
import Chat from "./app/chats/chat.entity";

dotenv.config()

const MODELS = [User, Token, Subject, Course, Chapter, Classe, Chat]

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
    logging: false,//process.env.NODE_ENV === "dev",
    entities: MODELS,
    migrations: ['./build/migrations/*js'],
    subscribers: [],
};

export default new DataSource(process.env.NODE_ENV === "test" ? sqliteOption : mysqlOption)