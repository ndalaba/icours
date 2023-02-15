import Response from "../../helpers/response";
import {LoginDto} from "../user/user.dto";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import {UserRepository} from "../user/user.repository";
import {tryCatch} from "../../helpers/functions";

export class LoginService {
    constructor(private readonly userRepository = new UserRepository()) {
    }

    async login(loginDto: LoginDto, userRepository = new UserRepository()): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await loginDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())
            const valid = !validation.hasError()

            if (!valid) return response

            const user = await userRepository.findOneByEmail(loginDto.email)

            if (!user || !await bcrypt.compare(loginDto.password, user.password)) return response.addError('email', "Email ou mot de passe incorrect.")

            if (!user.active) return response.addError('emailNotValidated', "Adresse email non confirmée.")

            const token = jwt.sign(user.email, process.env.SECRET_KEY)

            user.lastLogin = new Date()
            await userRepository.save(user)

            response.addData('token', token).addData('user', user)

            return response
        }, loginDto.email)
    }
}