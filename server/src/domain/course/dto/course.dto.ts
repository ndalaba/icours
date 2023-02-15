import {IsNotEmpty, IsNotEmptyObject, validate} from "class-validator";
import Errors from "../../../helpers/errors";
import Classe from "../../classes/classe.entity";
import User from "../../user/user.entity";
import Subject from "../../subject/subject.entity";

export class CourseDto {
    id: number = 0

    uid: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    tag: string

    published: boolean

    @IsNotEmptyObject()
    subject: Subject

    @IsNotEmptyObject()
    user: User
    classes: Classe[]

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}