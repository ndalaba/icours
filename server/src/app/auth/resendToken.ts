import * as dayjs from "dayjs"
import logger from "../../helpers/logger"
import Response from "../../helpers/response"
import { generateUid } from "../../helpers/string"
import { TokenRepository, UserRepository } from "../user/user.repository"


export const resendToken = async (email: string, userRepository = new UserRepository(), tokenRepository = new TokenRepository()): Promise<Response> => {
    logger.info(`Request to resend new token for email : ${email}`)
    const user = await userRepository.findOneByEmail( email)
    const response = new Response()
    if (user === null)
        return response.addError("email", "Email address not found.")
    const token = await tokenRepository.findOneByUser(user)
    token.token = generateUid()
    token.expireDate = dayjs().add(24, "hour").toDate()
    await tokenRepository.save(token)
    return response.addData("token", token).addData("user", user)
}
