import auth from "./middleware/auth";
import { SubjectController } from "./controllers/subject.controller";
import { UserController } from "./controllers/user.contorller";
import { ClasseController } from "./controllers/classes.controller";
import { CourseController } from "./controllers/courses.controller";
import { ChapterController } from "./controllers/chapters.controller";
import { ChatController } from "./controllers/chats.controller";
import { LoginController } from "./controllers/login.controller";
import { PasswordController } from "./controllers/password.controller";
import { RegisterController } from "./controllers/register.controller";

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