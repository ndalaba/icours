import logger from "../../helpers/logger";
import Response from "../../helpers/response";
import { LoginDto } from "../user/user.dto";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { UserRepository } from "../user/user.repository";

export const login = async (loginDto: LoginDto, userRepository = new UserRepository()): Promise<Response> => {
    logger.info(`Login a user : ${loginDto.email}`)

    const validation = await loginDto.validate()
    const response = new Response(new Map<string, any>(), validation.getErrors())
    const valid = !validation.hasError()

    if (!valid)
        return response

    const user = await userRepository.findOneByEmail(loginDto.email)

    if (!user || !await bcrypt.compare(loginDto.password, user.password))
        return response.addError('email', "Email ou mot de passe incorrect.")

    if (!user.active)
        return response.addError('emailNotValidated', "Adresse email non confirmée.")

    const token = jwt.sign(user.email, process.env.SECRET_KEY)

    user.lastLogin = new Date()
    await userRepository.save(user)
    
    response.addData('token', token)
    response.addData('user', user)

    return response
}