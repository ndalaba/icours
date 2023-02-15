import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import User, {Token} from "./domain/user/user.entity";
import * as dotenv from "dotenv"
import Classe from "./domain/classes/classe.entity";
import Course from "./domain/course/entity/course.entity";
import Chapter from "./domain/course/entity/chapter.entity";
import {Chat, Message} from "./domain/chats/chat.entity";
import Subject from "./domain/subject/subject.entity";

dotenv.config()

const MODELS = [User, Token, Subject, Course, Chapter, Classe, Chat, Message]

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