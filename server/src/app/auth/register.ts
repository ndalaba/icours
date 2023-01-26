import Response from "../../helpers/response";
import logger from "../../helpers/logger";
import { generateUid } from "../../helpers/string";
import * as dayjs from "dayjs"
import User, { Token } from "../user/user.entity";
import { CreateUserDto } from "../user/user.dto";
import * as bcrypt from "bcrypt"
import { TokenRepository, UserRepository } from "../user/user.repository";


const userRepository = new UserRepository()
const tokenRepository = new TokenRepository()


const isPhoneValid = async (phone: string, response: Response): Promise<boolean> => {
    const user = await userRepository.findOneByPhone( phone)
    if (user) {
        response.addError("phone", "Téléphone déjà utilisé.")
        return false
    }
    return true
}

const isEmailValid = async (email: string, response: Response): Promise<boolean> => {
    const user = await userRepository.findOneByEmail(email)
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
        let user = new User(createUserDto)
        user.password = await bcrypt.hash(user.password, 6)
        user = await userRepository.save(user)
        let token = new Token({ token: generateUid(), user, expireDate: dayjs().add(24, "hour").toDate() })
        token = await tokenRepository.save(token)
        response.addData("user", user).addData("token", token)
    }

    return response
}