import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import User, {Token} from "./app/user/user.entity";
import * as dotenv from "dotenv"

dotenv.config()

const sqliteOption: DataSourceOptions = {
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Token],
    migrations: ['./build/src/migrations/*js'],
};

const mysqlOption: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //synchronize: true,
    logging: process.env.NODE_ENV === "dev",
    entities: [User, Token],
    migrations: ['./build/src/migrations/*js'],
    subscribers: [],
};

export default new DataSource(process.env.NODE_ENV === "test" ? sqliteOption : mysqlOption)