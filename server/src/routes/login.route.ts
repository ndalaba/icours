import { Request, Response, Router } from "express";
import {  LoginDto } from "../app/user/user.dto";
import { errorResponse, successResponse } from "../helpers/response";
import { login } from "../app/auth/login";


const router = new Router()

router.post('/login', async (req: Request, res: Response) => {
    const response = await login(new LoginDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getJsonData())
})

export default router;