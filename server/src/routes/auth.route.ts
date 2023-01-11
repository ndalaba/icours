import {Request, Response, Router} from "express";
import {CreateUserDto} from "../app/user/user.dto";
import sendEmail from "../helpers/email";
import HttpStatusCode from "../helpers/httpStatusCode";
import {errorResponse, successResponse} from "../helpers/response";
import {render} from "../helpers/string";
import User, {Token} from "../app/user/user.entity";
import {register, resendToken, verifyToken} from "../app/auth/registration.service";

const router = new Router()

const sendToken = (user: User, token: Token) => {
    render("email/email_validation.twig", {
        subject: "Email validation",
        url: `${process.env.APP_URL}/auth/email-validation?token=${token.token}`
    }, (html: string) => {
        sendEmail(user.email, "Validation email", html)
    })
}

router.get("/verify-token/:token", async (req: Request, res: Response) => {
    const response = await verifyToken(req.params.token)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, [], "Token validated", HttpStatusCode.OK)
})


router.post("/register", async (req: Request, res: Response) => {
    const response = await register(new CreateUserDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendToken(response.getData("user"), response.getData("token"))
    return successResponse(res, response.getData("user"), "User registered", HttpStatusCode.CREATED)
})

router.post('/resend-token', async (req: Request, res: Response) => {
    const response = await resendToken(req.body.email)
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    sendToken(response.getData("user"), response.getData("token"))
    return successResponse(res, [], "New validation token send", HttpStatusCode.OK)
})


export default router;