import * as dayjs from "dayjs"
import Response from "../../helpers/response"
import {generateUid} from "../../helpers/string"
import {TokenRepository, UserRepository} from "../user/user.repository"
import {tryCatch} from "../../helpers/functions";


export class TokenService {
    constructor(private readonly userRepository = new UserRepository(), private readonly tokenRepository = new TokenRepository()) {
    }

    async token(email: string): Promise<Response> {
        return tryCatch(async _ => {
            const user = await this.userRepository.findOneByEmail(email)
            const response = new Response()
            if (user === null) return response.addError("email", "Email address not found.")
            const token = await this.tokenRepository.findOneByUser(user)
            token.token = generateUid()
            token.expireDate = dayjs().add(24, "hour").toDate()
            await this.tokenRepository.save(token)
            return response.addData("token", token).addData("user", user)
        }, email)
    }

    async verifyPasswordToken(value: string): Promise<Response> {
        return tryCatch(async _ => {
            const token = await this.tokenRepository.findOneByToken(value)
            const response = new Response()
            if (token === null) return response.addError('token', "Token invalide.")
            if (token.expireDate < new Date()) return response.addError("token", "Votre token a expiré.")

            return response.addData('token', token)
        }, value)
    }

    async verifyToken(value: string): Promise<Response> {
        return tryCatch(async _ => {
            const token = await this.tokenRepository.findOneByToken(value)
            const response = new Response()

            if (token === null) return response.addError('token', "Token invalide.")
            if (token.expireDate < new Date()) return response.addError("token", "Votre token de validation a expiré.")

            const user = token.user
            user.active = true
            await this.userRepository.save(user)
            return response
        }, value)
    }
}