import {Request, Response, Router} from "express";
import {createChat, deleteChat, getChats} from "../app/chats/chat.service";
import {ChatDto} from "../app/chats/chat.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const dto = {...req.body, user: res.locals.user}
    const response = await createChat(new ChatDto(dto))
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("chat"), "Chat created", HttpStatusCode.CREATED)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getChats(res.locals.user)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('chats'))
})

router.delete("/:uid", async (req: Request, res: Response) => {
    const response = await deleteChat(req.params.uid)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
})

export default router