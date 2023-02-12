import {Request, Response, Router} from "express";
import User from "../app/user/user.entity";
import {errorResponse, successResponse} from "../helpers/response";
import auth from "../middleware/auth";
import {UserService} from "../app/user/user.service";


export class UserController {
    constructor(private readonly userService = new UserService(), private readonly router = Router()) {
    }

    routes() {
        this.router.delete('/:uid', async (req: Request, res: Response) => {
            const response = await this.userService.remove(req.params.uid, new User())
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, null, "User removed.")
        })

        this.router.get('/:uid', async (req: Request, res: Response) => {
            const response = await this.userService.find(req.params.uid)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("user"))
        })

        this.router.get('/', auth, async (_: Request, res: Response) => {
            const response = await this.userService.findAll()
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("users"))
        })

        return this.router
    }
}