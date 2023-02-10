import * as dayjs from "dayjs"
import logger from "../../helpers/logger"
import Response from "../../helpers/response"
import {generateUid} from "../../helpers/string"
import {TokenRepository, UserRepository} from "../user/user.repository"
import * as bcrypt from "bcrypt";
import {verifyPasswordToken} from "./token";


export const password = async (email: string, userRepository = new UserRepository(), tokenRepository = new TokenRepository()): Promise<Response> => {
    try {
        const user = await userRepository.findOneByEmail(email)
        const response = new Response()
        if (user === null)
            return response.addError("email", "Adresse email non trouvée.")
        const token = await tokenRepository.findOneByUser(user)
        token.token = generateUid()
        token.expireDate = dayjs().add(24, "hour").toDate()
        await tokenRepository.save(token)
        return response.addData("token", token).addData("user", user)
    } catch (e) {
        logger.error(`Request to resend recover password: ${email} (${e.message})`)
        return new Response().addError('server', "Server error")
    }
}

export const updatePassword = async (password: string, passwordConfirmation: string, token: string, userRepository = new UserRepository(),): Promise<Response> => {
    try {
        logger.info(`Register a new user`)

        const response = await verifyPasswordToken(token)

        const valid = password.trim().length && (password === passwordConfirmation)
        if (!valid)
            response.addError('password', "Le mot de passe et la confirmation du mot de passe ne correspondent pas.")

        if (valid && !response.hasError()) {
            let user = response.getData('token').user
            user.password = await bcrypt.hash(user.password, 6)
            user = await userRepository.save(user)
            response.addData("user", user)
        }

        return response
    } catch (e) {
        logger.error(`Update user password: ${token} (${e.message})`)
        return new Response().addError('server', "Server error")
    }
}