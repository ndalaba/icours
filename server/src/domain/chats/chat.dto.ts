import {IsNotEmpty, IsNotEmptyObject, validate} from "class-validator";
import Errors from "../../helpers/errors";
import User from "../user/user.entity";
import {Chat} from "./chat.entity";


export class ChatDto {
    id: number = 0
    uid:string

    @IsNotEmpty()
    title: string

    @IsNotEmptyObject()
    user:User

    constructor(obj) {
        Object.assign(this, obj)
    }
    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}

export class MessageDto {
    id: number = 0
    uid:string

    @IsNotEmpty()
    question: string

    @IsNotEmptyObject()
    chat:Chat

    constructor(obj) {
        Object.assign(this, obj)
    }
    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}
