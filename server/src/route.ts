import loginRoutes from "./routes/login.route"
import registerRoutes from "./routes/register.route"
import passwordRoutes from "./routes/password.route"
import userRoutes from "./routes/user.route"
import subjectRoute from "./routes/subject.route";
import classeRoute from "./routes/classes.route";
import auth from "./middleware/auth";
import admin from "./middleware/admin";

export default (app) => {

    app.use('/api/auth', [loginRoutes, passwordRoutes, registerRoutes])
    app.use('/api/users', userRoutes)
    app.use('/api/subjects', auth, admin, subjectRoute)
    app.use('/api/classes', auth, admin, classeRoute)

    return app
}