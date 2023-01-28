import "reflect-metadata"
import * as dotenv from "dotenv"
import * as express from "express"
import * as path from "path";
import loginRoutes from "./routes/login.route"
import registerRoutes from "./routes/register.route"
import passwordRoutes from "./routes/password.route"
import userRoutes from "./routes/user.route"
import * as cors from "cors"
import * as cookieParser from "cookie-parser"

import trim from "./middleware/trim"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(trim)

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_PATH
}))

app.use('/static', express.static(path.join(__dirname, 'static')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use('/api/auth', [loginRoutes, passwordRoutes, registerRoutes])
app.use('/api/users', userRoutes)

export default app