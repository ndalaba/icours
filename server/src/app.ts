import "reflect-metadata"
import * as dotenv from "dotenv"
import * as express from "express"
import * as path from "path";
import * as bodyParser from "body-parser"
import autRoutes from "./routes/auth.route"
import userRoutes from "./routes/user.route"
import homeRouter from "./routes/home.route"

dotenv.config()

const app = express()

app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'static')))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use('/', homeRouter)
app.use('/api/auth', autRoutes)
app.use('/api/users', userRoutes)

export default app