import {Request, Response, Router} from "express";
import {ChatDto} from "../app/chats/chat.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import {ChatService} from "../app/chats/chat.service";


export class ChatController {
    constructor(private readonly chatService = new ChatService(), private readonly router = Router()) {
    }

    routes() {
        this.router.post('/', async (req: Request, res: Response) => {
            const dto = {...req.body, user: res.locals.user}
            const response = await this.chatService.createChat(new ChatDto(dto))
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("chat"), "Chat created", HttpStatusCode.CREATED)
        })

        this.router.get("/", async (_: Request, res: Response) => {
            const response = await this.chatService.getChats(res.locals.user)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('chats'))
        })

        this.router.delete("/:uid", async (req: Request, res: Response) => {
            const response = await this.chatService.deleteChat(req.params.uid)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
        })
        return this.router
    }
}