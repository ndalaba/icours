import "reflect-metadata"
import * as dotenv from "dotenv"
import * as express from "express"
import * as path from "path";
import * as cors from "cors"
import * as cookieParser from "cookie-parser"

import trim from "./middleware/trim"
import route from "./route";

dotenv.config()

export function bootstrap() {
    let app = express()

    app.use(express.urlencoded({extended: false}));
    app.use(express.json())
    app.use(cookieParser())
    app.use(trim)

    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_PATH.split('|')
    }))
console.log(process.env.CLIENT_PATH.split('|'))
    app.use('/static', express.static(path.join(__dirname, 'static')))

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');

    app = route(app)

    return app
}