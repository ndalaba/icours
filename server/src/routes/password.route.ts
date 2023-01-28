import { Router, Request, Response } from "express"
import { recoverPassword } from "../app/auth/recoverPassword";
import { updatePassword } from "../app/auth/updatePassword";
import { verifyPasswordToken } from "../app/auth/verifyPasswordToken";
import User, { Token } from "../app/user/user.entity";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import { errorResponse, successResponse } from "../helpers/response";
import { render } from "../helpers/string";


const router = Router()

const sendResetPasswordToken = (user: User, token: Token) => {
    render("email/recover_password.twig", {
        subject: "Réinitialisation mot de passe",
        url: `${process.env.APP_URL}/api/auth/verify-password-token?token=${token.token}`
    }, (html: string) => {
        sendEmail(user.email, "Réinitialisation mot de passe", html)
    })
}

router.post('/update-password', async (req: Request, res: Response) => {
    const { password, passwordConfirmation, token } = req.body
    const response = await updatePassword(password, passwordConfirmation, token)
    if (response.hasError())
        return res.render('recover_password.twig', { hasError: response.hasError(), errors: response.jsonErrors(), token: response.getData('token') })
    return res.render('notification.twig', { title: "Mot de passe modifié", message: "Votre mot de passe a été modifié avec succès." })

})

router.get('/verify-password-token', async (req: Request, res: Response) => {
    const response = await verifyPasswordToken(req.query.token as string)
    if (!response.hasError())
        return res.render('recover_password.twig', { token: response.getData('token') })
    return res.render('notification.twig', { title: "Token invalide", message: "Votre token est invalide ou a expiré." })
})


router.post('/recover-password', async (req: Request, res: Response) => {
    const response = await recoverPassword(req.body.email)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendResetPasswordToken(response.getData('user'), response.getData('token'))
    return successResponse(res, [], "Reset password email sent", HttpStatusCode.OK)
})

export default router;