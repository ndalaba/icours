import auth from "./middleware/auth";
import {SubjectController} from "./routes/subject.controller";
import {UserController} from "./routes/user.contorller";
import {ClasseController} from "./routes/classes.controller";
import {CourseController} from "./routes/courses.controller";
import {ChapterController} from "./routes/chapters.controller";
import {ChatController} from "./routes/chats.controller";
import {LoginController} from "./routes/login.controller";
import {PasswordController} from "./routes/password.controller";
import {RegisterController} from "./routes/register.controller";

export default (app) => {

    app.use('/api/auth', [new LoginController().routes(), new PasswordController().routes(), new RegisterController().routes()])
    app.use('/api/users', new UserController().routes())
    app.use('/api/subjects', new SubjectController().routes())
    app.use('/api/classes', new ClasseController().routes())
    app.use('/api/courses', new CourseController().routes())
    app.use('/api/chapters', new ChapterController().routes())
    app.use('/api/chats', auth, new ChatController().routes())

    return app
}