import {find, findAll, remove} from "../app/user/user.service";
import {Request, Response, Router} from "express";
import User from "../app/user/user.entity";
import {successResponse} from "../helpers/response";
import auth from "../middleware/auth";

const router = Router()

router.delete('/:uid', async (req: Request, res: Response) => {
    await remove(req.params.uid, new User())
    return successResponse(res, null, "User removed.")
})

router.get('/:uid', async (req: Request, res: Response) => {
    const response = await find(req.params.uid)
    return successResponse(res, response.getData("user"))
})

router.get('/',auth, async (_: Request, res: Response) => {
    const response = await findAll()
    return successResponse(res, response.getData("users"))
})

export default router