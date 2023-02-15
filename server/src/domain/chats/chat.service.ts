import Response from "../../helpers/response";
import {ChatDto, MessageDto} from "./chat.dto";
import {generateUid} from "../../helpers/string";
import {ChatRepository, MessageRepository} from "./chat.repository";
import {Chat, Message} from "./chat.entity";
import User from "../user/user.entity";
import {tryCatch} from "../../helpers/functions";

export class ChatService {
    constructor(private readonly chatRepository = new ChatRepository(), private readonly messageRepository = new MessageRepository()) {
    }

    async createChat(chatDto: ChatDto): Promise<Response> {
        return tryCatch(async _ => {
            const response = new Response()
            let chat = new Chat(chatDto)
            chat.id = 0
            chat.uid = generateUid()
            chat.user = chatDto.user
            chat = await this.chatRepository.save(chat)
            const messageRes = await this.createMessage(new MessageDto({chat: chat, question: chatDto.title}))
            return response.addData('chat', chat).addData('message',messageRes.getData("message"))
        }, chatDto.title)
    }

    async createMessage(messageDto: MessageDto): Promise<Response> {
        return tryCatch(async _ => {
            const response = new Response()
            const data = await this.query(messageDto.question)
            let message = new Message(messageDto)
            message.id = 0
            message.uid = generateUid()
            message.response = data?.choices[0]?.text
            message.chat = messageDto.chat
            message = await this.messageRepository.save(message)
            return response.addData('message', message)
        }, messageDto.question)
    }

    async getChats(user: User): Promise<Response> {
        return tryCatch(async _ => {
            const chats = await this.chatRepository.findAll(user.id)
            return new Response().addData("chats", chats)
        })
    }

    async getChat(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const chat = await this.chatRepository.findOrFail(uid)
            const messages = await this.messageRepository.findAll(chat.id)
            return new Response().addData("chat", chat).addData('messages', messages)
        })
    }

    async deleteChat(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const chat = await this.chatRepository.findOrFail(uid)
            await this.chatRepository.remove(chat)
            return new Response()
        }, uid)
    }

    async deleteMessage(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            await this.messageRepository.remove(uid)
            return new Response()
        }, uid)
    }

    private async query(prompt: string) {
        const res = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 2000,
                model: "text-davinci-003"
            })
        })
        return await res.json()
    }
}