import {Chat, Message} from "./chat.entity";
import DataSource from "../../ormconfig"


export class ChatRepository {

    getRepository() {
        return DataSource.getRepository(Chat);
    }

    async save(chat: Chat): Promise<Chat> {
        return await chat.save()
    }

    async findAll(userId: number): Promise<Chat[]> {
        return this.getRepository().find({
            where: {user: userId},
            order: {createdAt: "desc", id: "desc"}
        })
    }

    async findOrFail(uid: string): Promise<Chat> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(chat: Chat) {
        return this.getRepository().remove(chat)
    }
}

export class MessageRepository {

    getRepository() {
        return DataSource.getRepository(Message);
    }

    async save(message: Message): Promise<Message> {
        return await message.save()
    }

    async findAll(chatUid: number): Promise<Message[]> {
        return this.getRepository().find({
            where: {chat: chatUid},
            order: {id: "asc"}
        })
    }

    async findOrFail(uid: string): Promise<Message> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(uid: string) {
        return this.getRepository().createQueryBuilder('messages').delete().where("messages.uid = :uid",{'uid':uid}).execute()
    }
}