import {IsNotEmpty, validate} from "class-validator";
import Errors from "../../helpers/errors";


export class SubjectDto {
    id: number = 0

    @IsNotEmpty()
    subject: string

    @IsNotEmpty()
    description: string

    image: any

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}