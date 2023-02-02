import {IsNotEmpty, IsNotEmptyObject, validate} from "class-validator";
import Errors from "../../helpers/errors";
import Subject from "../subject/subject.entity";
import Classe from "../classes/classe.entity";

export class CourseDto {
    id: number = 0

    uid:string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    tag:string

    published:boolean

    @IsNotEmptyObject()
    subject:Subject

    classes:Classe[]

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}