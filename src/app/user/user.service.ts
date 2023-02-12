import Response from "../../helpers/response";
import User from "./user.entity";
import {NotAllowedError} from "../../helpers/errors";
import {UserRepository} from "./user.repository";
import {tryCatch} from "../../helpers/functions";

export class UserService {
    constructor(private readonly repository = new UserRepository()) {
    }

    async remove(uid: string, current: User): Promise<Response> {
        return tryCatch(async _ => {
            const user = await this.repository.findOneByOrFail(uid)
            if (!current.canManage(user))
                throw new NotAllowedError("Operation not allowed")
            await user.remove()
            return new Response()
        }, uid)
    }

    async find(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const user = await this.repository.findOneByOrFail(uid)
            return new Response().addData("user", user)
        }, uid)
    }

    async findAll(): Promise<Response> {
        return tryCatch(async _ => {
            const users = await this.repository.findAll()
            return new Response().addData("users", users)
        })
    }
}