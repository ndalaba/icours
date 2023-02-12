import Response from "../../helpers/response";
import {ChatDto} from "./chat.dto";
import {generateUid} from "../../helpers/string";
import ChatRepository from "./chat.repository";
import Chat from "./chat.entity";
import User from "../user/user.entity";
import {tryCatch} from "../../helpers/functions";

export class ChatService {
    constructor(private readonly chatRepository = new ChatRepository()) {
    }

    async createChat(chatDto: ChatDto): Promise<Response> {
        return tryCatch(async _ => {
            const response = new Response()
            const res = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    prompt: chatDto.question,
                    max_tokens: 2000,
                    model: "text-davinci-003"
                })
            })
            const data = await res.json()
            let chat = new Chat(chatDto)
            chat.id = 0
            chat.uid = generateUid()
            chat.response = data?.choices[0]?.text
            chat.user = chatDto.user
            chat = await this.chatRepository.save(chat)
            return response.addData('chat', chat)
        }, chatDto.question)
    }

    async getChats(user: User): Promise<Response> {
        return tryCatch(async _ => {
            const chats = await this.chatRepository.findAll(user.id)
            return new Response().addData("chats", chats)
        })
    }

    async deleteChat(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const chat = await this.chatRepository.findOrFail(uid)
            await this.chatRepository.remove(chat)
            return new Response()
        }, uid)
    }
}