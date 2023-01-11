import Response from "../../helpers/response";
import logger from "../../helpers/logger";
import User from "./user.entity";
import {NotAllowedError} from "../../helpers/errors";

export const remove = async (uid: string, current: User): Promise<Response> => {
    logger.info(`Delete user by uid: ${uid}`)
    const user = await User.findOneByOrFail({uid})
    if (!current.canManage(user))
        throw new NotAllowedError("Operation not allowed")
    await user.remove()
    return new Response()
}

export const find = async (uid: string): Promise<Response> => {
    logger.info(`Get user by uid: ${uid}`)
    const user = await User.findOneByOrFail({uid})
    return new Response().addData("user", user)
}

export const findAll = async (): Promise<Response> => {
    logger.info(`Get users`)
    const users = await User.find()
    return new Response().addData("users", users)
}
