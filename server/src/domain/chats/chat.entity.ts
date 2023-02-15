import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import BaseEntity from "../shared/BaseEntity";
import User from "../user/user.entity";


@Entity('chats')
export class Chat extends BaseEntity {

    @Column({type: "tinytext", nullable: false})
    title: string

    @ManyToOne(() => User, (user) => user.chats)
    user: User

    @OneToMany(() => Message, (message) => message.chat, {cascade: ["remove"]})
    messages: Message[]

    constructor(chat?: Partial<Chat>) {
        super()
        Object.assign(this, chat)
    }
}

@Entity('messages')
export class Message extends BaseEntity {

    @Column({type: "tinytext", nullable: false})
    question: string

    @Column({type: "longtext", nullable: false})
    response: string

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat

    constructor(message?: Partial<Message>) {
        super()
        Object.assign(this, message)
    }
}