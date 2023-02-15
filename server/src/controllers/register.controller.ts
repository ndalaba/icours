import {Request, Response, Router} from "express";
import {CreateUserDto} from "../domain/user/user.dto";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import {errorResponse, successResponse} from "../helpers/response";
import {render} from "../helpers/string";
import User, {Token} from "../domain/user/user.entity";
import {RegisterService} from "../domain/auth/register.service";
import {TokenService} from "../domain/auth/token.service";


export class RegisterController {
    constructor(private readonly registerService = new RegisterService(), private readonly tokenService = new TokenService(), private readonly router = Router()) {
    }

    routes() {
        const sendEmailValidationToken = (user: User, token: Token) => {
            render("email/email_validation.twig", {
                    subject: "Email validation",
                    url: `${process.env.APP_URL}/api/auth/email-validation?token=${token.token}`
                }, (html: string) => sendEmail(user.email, "Validation email", html)
            )
        }

        this.router.get("/email-validation", async (req: Request, res: Response) => {
            const response = await this.tokenService.verifyToken(req.query.token as string)
            return res.render('email_validation.twig', {hasError: response.hasError(), errors: response.jsonErrors()})
        })

        this.router.post("/register", async (req: Request, res: Response) => {
            const response = await this.registerService.register(new CreateUserDto(req.body))
            if (response.hasError()) return errorResponse(res, response.jsonErrors())
            sendEmailValidationToken(response.getData("user"), response.getData("token"))
            return successResponse(res, response.getData("user"), "User registered", HttpStatusCode.CREATED)
        })

        this.router.post('/resend-token', async (req: Request, res: Response) => {
            const response = await this.tokenService.token(req.body.email)
            if (response.hasError()) return errorResponse(res, response.jsonErrors())
            sendEmailValidationToken(response.getData("user"), response.getData("token"))
            return successResponse(res, [], "New validation token send", HttpStatusCode.OK)
        })
        return this.router
    }
}
