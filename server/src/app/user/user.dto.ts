import User, {Gender} from "./user.entity";
import {IsEmail, IsInstance, IsNotEmpty, validate} from "class-validator";
import Errors from "../../helpers/errors";


export class UpdatePasswordDto {

    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    passwordConfirmation: string

    @IsInstance(User)
    user: Partial<User>

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        const errors = new Errors().mapValidationErrors(await validate(this))
        if (this.passwordConfirmation !== this.password)
            errors.addError("passwordConfirmation", "User password and confirmation password must be same.")
        return errors
    }
}

export class UpdateUserDto {

    private static MINIMUM_USER_AGE = 16

    @IsNotEmpty({message: "First name is required"})
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsInstance(User)
    user: Partial<User>

    gender: number
    cityId: number
    birthDay: number
    birthMonth: number
    birthYear: number
    address: string
    about: string

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        const errors =  new Errors().mapValidationErrors(await validate(this))
        if (this.birthDay && this.birthMonth && this.birthYear) {
            const birth = new Date(this.birthYear, this.birthMonth, this.birthDay)
            const now = new Date()
            if ((now.getFullYear() - birth.getFullYear()) < UpdateUserDto.MINIMUM_USER_AGE)
                errors.addError("age", `User must be older than ${UpdateUserDto.MINIMUM_USER_AGE}`)
        }
        if (this.gender && !Gender.isValid(this.gender))
            errors.addError("gender", "User gender is not valid")
        return errors
    }
}

export class CreateUserDto {
    @IsNotEmpty({message: "First name is required"})
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    password: string

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}