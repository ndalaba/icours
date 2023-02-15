import {IsNotEmpty, validate} from "class-validator";
import Errors from "../../helpers/errors";


export class ClasseDto {
    id: number = 0

    uid:string

    @IsNotEmpty()
    name: string

    description: string

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}
