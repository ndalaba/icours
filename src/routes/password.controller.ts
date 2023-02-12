import {Request, Response, Router} from "express"
import User, {Token} from "../app/user/user.entity";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import {errorResponse, successResponse} from "../helpers/response";
import {render} from "../helpers/string";
import {PasswordService} from "../app/auth/password.service";
import {TokenService} from "../app/auth/token.service";


export class PasswordController {
    constructor(private readonly passwordService = new PasswordService(), private readonly tokenService = new TokenService(), private readonly router = Router()) {
    }

    routes() {
        const sendResetPasswordToken = (user: User, token: Token) => {
            render("email/recover_password.twig", {
                subject: "Réinitialisation mot de passe",
                url: `${process.env.APP_URL}/api/auth/verify-password-token?token=${token.token}`
            }, (html: string) => {
                sendEmail(user.email, "Réinitialisation mot de passe", html)
            })
        }

        this.router.post('/update-password', async (req: Request, res: Response) => {
            const {password, passwordConfirmation, token} = req.body
            const response = await this.passwordService.updatePassword(password, passwordConfirmation, token)
            if (response.hasError())
                return res.render('recover_password.twig', {
                    hasError: response.hasError(),
                    errors: response.jsonErrors(),
                    token: response.getData('token')
                })
            return res.render('notification.twig', {
                title: "Mot de passe modifié",
                message: "Votre mot de passe a été modifié avec succès."
            })
        })

        this.router.get('/verify-password-token', async (req: Request, res: Response) => {
            const response = await this.tokenService.verifyPasswordToken(req.query.token as string)
            if (!response.hasError())
                return res.render('recover_password.twig', {token: response.getData('token')})
            return res.render('notification.twig', {
                title: "Token invalide",
                message: "Votre token est invalide ou a expiré."
            })
        })

        this.router.post('/recover-password', async (req: Request, res: Response) => {
            const response = await this.passwordService.passwordToken(req.body.email)
            if (response.hasError())
                return errorResponse(res, response.jsonErrors())
            sendResetPasswordToken(response.getData('user'), response.getData('token'))
            return successResponse(res, [], "Reset password email sent", HttpStatusCode.OK)
        })

        return this.router;
    }
}