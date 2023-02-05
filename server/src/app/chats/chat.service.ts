import Response from "../../helpers/response";
import {ChatDto} from "./chat.dto";
import logger from "../../helpers/logger";
import {generateUid} from "../../helpers/string";
import ChatRepository from "./chat.repository";
import Chat from "./chat.entity";
import User from "../user/user.entity";

const chatRepository = new ChatRepository()

export const createChat = async (chatDto: ChatDto): Promise<Response> => {
    try {
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
        chat = await chatRepository.save(chat)
        return response.addData('chat', chat)
    } catch (e) {
        logger.error(`Create new Chat : "${chatDto.question}" failed:` + e)
    }

}


export const getChats = async (user: User): Promise<Response> => {
    const chats = await chatRepository.findAll(user.id)
    return new Response().addData("chats", chats)
}

export const deleteChat = async (uid: string): Promise<Response> => {
    try {
        const chat = await chatRepository.findOrFail(uid)
        await chatRepository.remove(chat)
        return new Response()
    } catch (e) {
        logger.error(`Delete chat "${uid}" failed: ${e}`)
    }
}