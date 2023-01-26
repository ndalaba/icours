import { Router, Request, Response } from "express"
import { recoverPassword } from "../app/auth/recoverPassword";
import User, { Token } from "../app/user/user.entity";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import { errorResponse, successResponse } from "../helpers/response";
import { render } from "../helpers/string";


const router = new Router()

const sendResetPasswordToken = (user: User, token: Token) => {
    render("email/recover_password.twig", {
        subject: "Réinitialisation mot de passe",
        url: `${process.env.APP_URL}/api/auth/reset-password?token=${token.token}`
    }, (html: string) => {
        sendEmail(user.email, "Réinitialisation mot de passe", html)
    })
}


router.get('/reset-password', async (req: Request, res: Response) => {
    const response = await recoverPassword(req.body.email)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendResetPasswordToken(response.getData('user'), response.getData('token'))
    return successResponse(res, [], "Reset password email sent", HttpStatusCode.OK)
})


router.post('/recover-password', async (req: Request, res: Response) => {
    const response = await recoverPassword(req.body.email)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendResetPasswordToken(response.getData('user'), response.getData('token'))
    return successResponse(res, [], "Reset password email sent", HttpStatusCode.OK)
})

export default router;