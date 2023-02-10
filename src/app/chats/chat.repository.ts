import Chat from "./chat.entity";
import DataSource from "../../ormconfig"


export default class ChatRepository {

    getRepository() {
        return DataSource.getRepository(Chat);
    }

    async save(chat: Chat): Promise<Chat> {
        return await chat.save()
    }

    async findAll(userId: number): Promise<Chat[]> {
        return this.getRepository().find({
            where: {
                user: userId
            },
            order: {
                createdAt: "desc",
                id: "desc"
            }
        })
    }

    async findOrFail(uid: string): Promise<Chat> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(chat: Chat) {
        return this.getRepository().remove(chat)
    }
}