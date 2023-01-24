import Response from "../../helpers/response";
import logger from "../../helpers/logger";
import { generateUid } from "../../helpers/string";
import * as dayjs from "dayjs"
import User, { Token } from "../user/user.entity";
import { CreateUserDto } from "../user/user.dto";
import DataSource from "../../ormconfig"
import * as bcrypt from "bcrypt"
import { TokenRepository } from "../user/user.repository";


const tokenRepository = new TokenRepository()


const isPhoneValid = async (phone: string, response: Response): Promise<boolean> => {
    const user = await User.findOneBy({ phone })
    if (user) {
        response.addError("phone", "Téléphone déjà utilisé.")
        return false
    }
    return true
}
const isEmailValid = async (email: string, response: Response): Promise<boolean> => {
    const user = await User.findOneBy({ email })
    if (user) {
        response.addError("email", "Email déjà utilisé.")
        return false
    }
    return true
}

export const register = async (createUserDto: CreateUserDto): Promise<Response> => {
    logger.info(`Register a new user`)

    const validation = await createUserDto.validate()
    const response = new Response(new Map<string, any>(), validation.getErrors())

    const valid = !validation.hasError()
    const emailIsValid = await isEmailValid(createUserDto.email, response)
    const phoneIsValid = await isPhoneValid(createUserDto.phone, response)

    if (valid && emailIsValid && phoneIsValid) {
        const user = new User(createUserDto)
        user.password = await bcrypt.hash(user.password, 6)
        await user.save()
        const token = new Token({ token: generateUid(), user, expireDate: dayjs().add(24, "hour").toDate() })
        await token.save()
        response.addData("user", user).addData("token", token)
    }
    return response
}

export const verifyToken = async (value: string): Promise<Response> => {
    logger.info(`Request to verify token ${value}`)
    const token = await tokenRepository.findOneBy('token', value)
    const response = new Response()
    if (token === null) {
        return response.addError('token', "Token invalide.")
    }
    if (token.expireDate < new Date()) {
        return response.addError("token", "Votre token de validation expiré.")
    }
    const user = token.user
    user.active = true
    user.save()
    return response
}

export const resendToken = async (email: string): Promise<Response> => {
    logger.info(`Request to resend new token for email : ${email}`)
    const user: User = await User.findOneBy({ email })
    const response = new Response()
    if (user === null)
        return response.addError("email", "Email address not found.")
    const token = await tokenRepository.findOneBy('user',user.id)
    token.token = generateUid()
    token.expireDate = dayjs().add(24, "hour").toDate()
    await token.save()
    return response.addData("token", token).addData("user", user)
}
