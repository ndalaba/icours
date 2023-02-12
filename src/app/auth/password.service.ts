import * as dayjs from "dayjs"
import Response from "../../helpers/response"
import {generateUid} from "../../helpers/string"
import {TokenRepository, UserRepository} from "../user/user.repository"
import * as bcrypt from "bcrypt";
import {tryCatch} from "../../helpers/functions";
import {TokenService} from "./token.service";

export class PasswordService {
    constructor(private readonly userRepository = new UserRepository(), private readonly tokenRepository = new TokenRepository(), private readonly tokenService = new TokenService()) {
    }


    async passwordToken(email: string): Promise<Response> {
        return tryCatch(async _ => {
            const user = await this.userRepository.findOneByEmail(email)
            const response = new Response()
            if (user === null) return response.addError("email", "Adresse email non trouvée.")
            const token = await this.tokenRepository.findOneByUser(user)
            token.token = generateUid()
            token.expireDate = dayjs().add(24, "hour").toDate()
            await this.tokenRepository.save(token)
            return response.addData("token", token).addData("user", user)
        }, email)
    }

    async updatePassword(password: string, passwordConfirmation: string, token: string): Promise<Response> {
        return tryCatch(async _ => {
            const response = await this.tokenService.verifyPasswordToken(token)

            const valid = password.trim().length && (password === passwordConfirmation)
            if (!valid) response.addError('password', "Le mot de passe et la confirmation du mot de passe ne correspondent pas.")

            if (valid && !response.hasError()) {
                let user = response.getData('token').user
                user.password = await bcrypt.hash(user.password, 6)
                user = await this.userRepository.save(user)
                response.addData("user", user)
            }
            return response
        }, token)
    }
}