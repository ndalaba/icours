import Response from "../../helpers/response";
import logger from "../../helpers/logger";
import User from "./user.entity";
import {NotAllowedError} from "../../helpers/errors";


export const remove = async (uid: string, current: User): Promise<Response> => {
    try {
        const user = await User.findOneByOrFail({uid})
        if (!current.canManage(user))
            throw new NotAllowedError("Operation not allowed")
        await user.remove()
        return new Response()
    } catch (e) {
        logger.error(`Delete user by uid: ${uid} (${e.message})`)
        return new Response().addError("server", "Server Error")
    }
}

export const find = async (uid: string): Promise<Response> => {
    try {
        const user = await User.findOneByOrFail({uid})
        return new Response().addData("user", user)
    } catch (e) {
        logger.error(`Get user by uid: ${uid} (${e.message})`)
        return new Response().addError("server", "Server Error")
    }
}

export const findAll = async (): Promise<Response> => {
    try {
        const users = await User.find()
        return new Response().addData("users", users)
    } catch (e) {
        logger.error(`Get users (${e.message})`)
        return new Response().addError("server", "Server Error")
    }
}
