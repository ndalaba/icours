import { Request, Response, Router } from "express";
import { CreateUserDto } from "../app/user/user.dto";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import { errorResponse, successResponse } from "../helpers/response";
import { render } from "../helpers/string";
import User, { Token } from "../app/user/user.entity";
import { register } from "../app/auth/register";
import { verifyToken } from "../app/auth/verifyToken";
import { resendToken } from "../app/auth/resendToken";


const router =  Router()

const sendEmailValidationToken = (user: User, token: Token) => {
    render("email/email_validation.twig", {
        subject: "Email validation",
        url: `${process.env.APP_URL}/api/auth/email-validation?token=${token.token}`
    }, (html: string) => {
        sendEmail(user.email, "Validation email", html)
    })
}

router.get("/email-validation", async (req: Request, res: Response) => {
    const response = await verifyToken(req.query.token as string)
    return res.render('email_validation.twig', { hasError: response.hasError(), errors: response.jsonErrors() })
})

router.post("/register", async (req: Request, res: Response) => {
    const response = await register(new CreateUserDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendEmailValidationToken(response.getData("user"), response.getData("token"))
    return successResponse(res, response.getData("user"), "User registered", HttpStatusCode.CREATED)
})

router.post('/resend-token', async (req: Request, res: Response) => {
    const response = await resendToken(req.body.email)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendEmailValidationToken(response.getData("user"), response.getData("token"))
    return successResponse(res, [], "New validation token send", HttpStatusCode.OK)
})

export default router;