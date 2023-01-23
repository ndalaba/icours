import logger from "../../helpers/logger";
import Response from "../../helpers/response";
import { LoginDto } from "../user/user.dto";
import User from "../user/user.entity";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export const login = async (loginDto: LoginDto): Promise<Response> => {
    logger.info(`Login a user`)

    const validation = await loginDto.validate()
    const response = new Response(new Map<string, any>(), validation.getErrors())
    const valid = !validation.hasError()

    if (!valid)
        return response

    const user = await User.findOneBy({ email: loginDto.email })

    if (!user || !await bcrypt.compare(loginDto.password, user.password))
        return response.addError('email', "Email ou mot de passe incorrect.")

    if (!user.active)
        return response.addError('emailNotValidated', "Adresse email non confirmé.")

    const token = jwt.sign(user.email, process.env.SECRET_KEY)

    response.addData('token', token)
    response.addData('user', user)

    return response
}