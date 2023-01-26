import logger from "../../helpers/logger"
import Response from "../../helpers/response"
import { TokenRepository, UserRepository } from "../user/user.repository"


export const resetPassword = async (value: string, tokenRepository = new TokenRepository, userRepository = new UserRepository): Promise<Response> => {
    logger.info(`Request to verify token ${value}`)

    const token = await tokenRepository.findOneByToken(value)

    const response = new Response()

    if (token === null) {
        return response.addError('token', "Token invalide.")
    }

    if (token.expireDate < new Date()) {
        return response.addError("token", "Votre token de validation a expiré.")
    }

    const user = token.user
    user.active = true
    await userRepository.save(user)
    return response
}
