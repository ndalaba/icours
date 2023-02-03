import {find, findAll, remove} from "../app/user/user.service";
import {Request, Response, Router} from "express";
import User from "../app/user/user.entity";
import {successResponse} from "../helpers/response";
import auth from "../middleware/auth";
import logger from "../helpers/logger";

const router = Router()

router.delete('/:uid', async (req: Request, res: Response) => {
    try {
        await remove(req.params.uid, new User())
        return successResponse(res, null, "User removed.")
    } catch (e) {
        logger.error(e)
    }
})

router.get('/:uid', async (req: Request, res: Response) => {
    try {
        const response = await find(req.params.uid)
        return successResponse(res, response.getData("user"))
    } catch (e) {
        logger.error(e)
    }
})

router.get('/', auth, async (_: Request, res: Response) => {
    try {
        const response = await findAll()
        return successResponse(res, response.getData("users"))
    } catch (e) {
        logger.error(e)
    }
})

export default router