import Response from "../../../helpers/response";
import {CourseDto} from "../dto/course.dto";
import logger from "../../../helpers/logger";
import {generateUid, slugify} from "../../../helpers/string";
import CourseRepository from "../repository/course.repository";
import Course from "../entity/course.entity";
import User from "../../user/user.entity";

const courseRepository = new CourseRepository()

export const createCourse = async (courseDto: CourseDto): Promise<Response> => {
    try {
        const validation = await courseDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()

        if (valid) {
            let course = new Course(courseDto)
            course.id = 0
            course.uid = generateUid()
            course.slug = slugify(course.title)
            course.classes = courseDto.classes
            course = await courseRepository.save(course)
            response.addData("course", course)
        }
        return response
    } catch (e) {
        logger.error(`Create new Course : "${courseDto.title}" failed:` + e)
        return new Response().addError('error', "Server error")
    }
}

export const updateCourse = async (courseDto: CourseDto): Promise<Response> => {
    try {
        let course = await courseRepository.findOrFail(courseDto.uid)
        if (!course.canEdit(courseDto.user))
            throw new Error("Action not allowed")

        const validation = await courseDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()

        if (valid) {
            course.slug = slugify(courseDto.title)
            course.title = courseDto.title
            course.tag = courseDto.tag
            course.published = courseDto.published
            course.subject = courseDto.subject
            course.content = courseDto.content
            course.classes = courseDto.classes
            course = await courseRepository.save(course)
            response.addData("course", course)
        }
        return response
    } catch (e) {
        logger.error(`Updating a Course "${courseDto.title}" failed:` + e)
        return new Response().addError('error', "Server error")
    }
}

export const getCourses = async (subject: any, classe: any, published: any): Promise<Response> => {
    try {
        const subjectId = subject !== undefined ? +subject : 0
        const classeId = classe !== undefined ? +classe : 0
        const isPublished = published !== undefined ? +published : 2
        const courses = await courseRepository.findAll(subjectId, classeId, +isPublished)
        return new Response().addData("courses", courses)
    } catch (e) {
        logger.error(`Get courses failed: ${e}`)
        return new Response().addError('error', "Server error")
    }
}

export const getCourse = async (uid: string): Promise<Response> => {
    try {
        const course = await courseRepository.findOrFail(uid)
        return new Response().addData("course", course)
    } catch (e) {
        logger.error(`Get course "${uid}" failed: ${e}`)
        return new Response().addError('error', "Server error")
    }
}

export const getCourseBySlug = async (slug: string): Promise<Response> => {
    try {
        const course = await courseRepository.findOneBySlug(slug)
        return new Response().addData("course", course)
    } catch (e) {
        logger.error(`Get course "${slug}" failed: ${e}`)
        return new Response().addError('error', "Server error")
    }
}

export const deleteCourse = async (uid: string, user: User): Promise<Response> => {
    try {
        const course = await courseRepository.findOrFail(uid)
        if (!course.canEdit(user))
            throw new Error("Action not allowed")

        const chaptersCount = await courseRepository.countChapters(course.id)
        if (chaptersCount)
            return new Response().addError("course", "Ce cours a des chapitres associés.")
        await courseRepository.remove(course)
        return new Response()
    } catch (e) {
        logger.error(`Delete course "${uid}" failed: ${e}`)
        return new Response().addError('error', "Server error")
    }
}