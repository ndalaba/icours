import Response from "../../helpers/response";
import {generateUid} from "../../helpers/string";
import * as dayjs from "dayjs"
import User, {Token} from "../user/user.entity";
import {CreateUserDto} from "../user/user.dto";
import * as bcrypt from "bcrypt"
import {TokenRepository, UserRepository} from "../user/user.repository";
import {tryCatch} from "../../helpers/functions";


export class RegisterService {
    constructor(private readonly userRepository = new UserRepository(), private readonly tokenRepository = new TokenRepository()) {
    }

    async register(createUserDto: CreateUserDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await createUserDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            const valid = !validation.hasError()
            const emailIsValid = await this.isEmailValid(createUserDto.email, response)
            const phoneIsValid = await this.isPhoneValid(createUserDto.phone, response)

            if (valid && emailIsValid && phoneIsValid) {
                let user = new User(createUserDto)
                user.password = await bcrypt.hash(user.password, 6)
                user = await this.userRepository.save(user)
                let token = new Token({token: generateUid(), user, expireDate: dayjs().add(24, "hour").toDate()})
                token = await this.tokenRepository.save(token)
                response.addData("user", user).addData("token", token)
            }
            return response
        })
    }

    private async isPhoneValid(phone: string, response: Response): Promise<boolean> {
        const user = await this.userRepository.findOneByPhone(phone)
        if (user) {
            response.addError("phone", "Téléphone déjà utilisé.")
            return false
        }
        return true
    }

    private async isEmailValid(email: string, response: Response): Promise<boolean> {
        const user = await this.userRepository.findOneByEmail(email)
        if (user) {
            response.addError("email", "Email déjà utilisé.")
            return false
        }
        return true
    }
}