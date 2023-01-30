import { Request, Response, Router } from "express";
import { LoginDto } from "../app/user/user.dto";
import { errorResponse, successResponse } from "../helpers/response";
import { login } from "../app/auth/login";
import * as cookie from "cookie"
import auth from "../middleware/auth";

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
    console.log(req.body)
    const response = await login(new LoginDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    res.set('Set-Cookie', cookie.serialize('token', response.getData('token'), {
        httpOnly: true,
        path: '/',
        maxAge: req.body.remember_me != undefined ? 30 * 24 * 3600 : 3600,
        sameSite: true,
        secure: process.env.NODE_ENV === "prod"

    }))
    return successResponse(res, response.getData('user'))
})

router.get('/me', auth, (_: Request, res: Response) => {
    return successResponse(res, res.locals.user)
})

router.get('/logout', (_: Request, res: Response) => {
    res.set('Set-Cookie', cookie.serialize('token', "", {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
        sameSite: true,
        secure: process.env.NODE_ENV === "prod"

    }))
    return successResponse(res, [])
})

export default router;