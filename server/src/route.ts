import loginRoutes from "./routes/login.route"
import registerRoutes from "./routes/register.route"
import passwordRoutes from "./routes/password.route"
import userRoutes from "./routes/user.route"
import subjectRoute from "./routes/subject.route";
import classeRoute from "./routes/classes.route";
import courseRoute from "./routes/courses.route";
import chapterRoute from "./routes/chapters.route";
import chatRoute from "./routes/chats.route";
import auth from "./middleware/auth";
import admin from "./middleware/admin";

export default (app) => {

    app.use('/api/auth', [loginRoutes, passwordRoutes, registerRoutes])
    app.use('/api/users', userRoutes)
    app.use('/api/subjects', auth, admin, subjectRoute)
    app.use('/api/classes', auth, admin, classeRoute)
    app.use('/api/courses', auth, admin, courseRoute)
    app.use('/api/chapters', auth, admin, chapterRoute)
    app.use('/api/chats', auth,  chatRoute)

    return app
}