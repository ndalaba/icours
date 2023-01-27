import Response from "../../helpers/response";
import logger from "../../helpers/logger";
import * as bcrypt from "bcrypt"
import { UserRepository } from "../user/user.repository";
import { verifyPasswordToken } from "./verifyPasswordToken";

const userRepository = new UserRepository()


export const updatePassword = async (password: string, passwordConfirmation: string, token: string): Promise<Response> => {
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
}