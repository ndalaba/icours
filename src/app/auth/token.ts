import * as dayjs from "dayjs"
import logger from "../../helpers/logger"
import Response from "../../helpers/response"
import {generateUid} from "../../helpers/string"
import {TokenRepository, UserRepository} from "../user/user.repository"


export const token = async (email: string, userRepository = new UserRepository(), tokenRepository = new TokenRepository()): Promise<Response> => {
    try {
        const user = await userRepository.findOneByEmail(email)
        const response = new Response()
        if (user === null)
            return response.addError("email", "Email address not found.")
        const token = await tokenRepository.findOneByUser(user)
        token.token = generateUid()
        token.expireDate = dayjs().add(24, "hour").toDate()
        await tokenRepository.save(token)
        return response.addData("token", token).addData("user", user)
    } catch (e) {
        logger.error(`Request to resend new token for email: ${email} (${e.message})`)
        return new Response().addError('server', "Server error")
    }
}

export const verifyPasswordToken = async (value: string, tokenRepository = new TokenRepository()): Promise<Response> => {
    try {
        const token = await tokenRepository.findOneByToken(value)

        const response = new Response()

        if (token === null) return response.addError('token', "Token invalide.")

        if (token.expireDate < new Date()) return response.addError("token", "Votre token a expiré.")

        return response.addData('token', token)
    } catch (e) {
        logger.error(`Request to verify password token: ${value} (${e.message})`)
        return new Response().addError('server', "Server error")
    }
}


export const verifyToken = async (value: string, tokenRepository = new TokenRepository, userRepository = new UserRepository): Promise<Response> => {
    try {
        const token = await tokenRepository.findOneByToken(value)

        const response = new Response()

        if (token === null) return response.addError('token', "Token invalide.")

        if (token.expireDate < new Date()) return response.addError("token", "Votre token de validation a expiré.")

        const user = token.user
        user.active = true
        await userRepository.save(user)
        return response
    } catch (e) {
        logger.error(`Request to verify token: ${value} (${e.message})`)
        return new Response().addError('server', "Server error")
    }
}