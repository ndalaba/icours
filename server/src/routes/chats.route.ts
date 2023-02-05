import {Request, Response, Router} from "express";
import {createChat, deleteChat, getChats} from "../app/chats/chat.service";
import {ChatDto} from "../app/chats/chat.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const dto = {...req.body, user: res.locals.user}
        const response = await createChat(new ChatDto(dto))
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("chat"), "Chat created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.get("/", async (_: Request, res: Response) => {
    try {
        const response = await getChats(res.locals.user)
        return successResponse(res, response.getData('chats'))
    } catch (e) {
        logger.error(e)
    }
})

router.delete("/:uid", async (req: Request, res: Response) => {
    try {
        await deleteChat(req.params.uid)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router