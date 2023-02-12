import Response from "../../../helpers/response";
import {CourseDto} from "../dto/course.dto";
import {generateUid, slugify} from "../../../helpers/string";
import CourseRepository from "../repository/course.repository";
import Course from "../entity/course.entity";
import User from "../../user/user.entity";
import {tryCatch} from "../../../helpers/functions";


export class CourseService {
    constructor(private readonly courseRepository = new CourseRepository()) {
    }

    async createCourse(courseDto: CourseDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await courseDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            if (!validation.hasError()) {
                let course = new Course(courseDto)
                course.id = 0
                course.uid = generateUid()
                course.slug = slugify(course.title)
                course.classes = courseDto.classes
                course = await this.courseRepository.save(course)
                response.addData("course", course)
            }
            return response
        }, courseDto.title)
    }

    async updateCourse(courseDto: CourseDto): Promise<Response> {
        return tryCatch(async _ => {
            let course = await this.courseRepository.findOrFail(courseDto.uid)
            if (!course.canEdit(courseDto.user))
                throw new Error("Action not allowed")

            const validation = await courseDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            if (!validation.hasError()) {
                course.slug = slugify(courseDto.title)
                course.title = courseDto.title
                course.tag = courseDto.tag
                course.published = courseDto.published
                course.subject = courseDto.subject
                course.content = courseDto.content
                course.classes = courseDto.classes
                course = await this.courseRepository.save(course)
                response.addData("course", course)
            }
            return response
        }, courseDto.title)
    }

    async getCourses(subject: any, classe: any, published: any): Promise<Response> {
        return tryCatch(async _ => {
            const subjectId = subject !== undefined ? +subject : 0
            const classeId = classe !== undefined ? +classe : 0
            const isPublished = published !== undefined ? +published : 2
            const courses = await this.courseRepository.findAll(subjectId, classeId, +isPublished)
            return new Response().addData("courses", courses)
        })
    }

    async getCourse(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const course = await this.courseRepository.findOrFail(uid)
            return new Response().addData("course", course)
        }, uid)
    }

    async getCourseBySlug(slug: string): Promise<Response> {
        return tryCatch(async _ => {
            const course = await this.courseRepository.findOneBySlug(slug)
            return new Response().addData("course", course)
        }, slug)
    }

    async deleteCourse(uid: string, user: User): Promise<Response> {
        return tryCatch(async _ => {
            const course = await this.courseRepository.findOrFail(uid)
            if (!course.canEdit(user))
                throw new Error("Action not allowed")

            const chaptersCount = await this.courseRepository.countChapters(course.id)
            if (chaptersCount)
                return new Response().addError("course", "Ce cours a des chapitres associés.")
            await this.courseRepository.remove(course)
            return new Response()
        }, uid)
    }
}
