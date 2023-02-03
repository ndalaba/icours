import {IsNotEmpty, IsNotEmptyObject, validate} from "class-validator";
import Errors from "../../../helpers/errors";
import {CourseDto} from "./course.dto";
import Course from "../entity/course.entity";


export class ChapterDto {
    id: number = 0

    uid: string

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    tag: string

    published: boolean

    @IsNotEmptyObject()
    course: Course

    constructor(obj) {
        Object.assign(this, obj)
    }

    async validate() {
        return new Errors().mapValidationErrors(await validate(this))
    }
}