import {Column, Entity, ManyToOne} from "typeorm";
import BaseEntity from "../shared/BaseEntity";
import User from "../user/user.entity";


@Entity('chats')
export default class Chat extends BaseEntity {

    @Column({type: "tinytext", nullable: false})
    question: string

    @Column({type: "longtext", nullable: false})
    response: string

    @ManyToOne(() => User, (user) => user.chats)
    user: User

    constructor(classe?: Partial<Chat>) {
        super()
        Object.assign(this, classe)
    }
}