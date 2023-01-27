import logger from "../../helpers/logger"
import Response from "../../helpers/response"
import { TokenRepository } from "../user/user.repository"


export const verifyPasswordToken = async (value: string, tokenRepository = new TokenRepository()): Promise<Response> => {
    logger.info(`Request to verify password token ${value}`)

    const token = await tokenRepository.findOneByToken(value)

    const response = new Response()

    if (token === null) {
        return response.addError('token', "Token invalide.")
    }

    if (token.expireDate < new Date()) {
        return response.addError("token", "Votre token a expiré.")
    }

    return response.addData('token', token)
}
