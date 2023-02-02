import Response from "../../helpers/response";
import {CourseDto} from "./course.dto";
import logger from "../../helpers/logger";
import {generateUid, slugify} from "../../helpers/string";
import CourseRepository from "./course.repository";
import {Course} from "./course.entity";

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
            course = await courseRepository.save(course)
            response.addData("course", course)
        }
        return response
    } catch (e) {
        logger.error(`Create new Course : "${courseDto.title}" failed:` + e)
    }
}

export const updateCourse = async (courseDto: CourseDto): Promise<Response> => {
    try {
        const validation = await courseDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()

        if (valid) {
            let course = await courseRepository.findOrFail(courseDto.uid)
            course.slug = slugify(courseDto.title)
            course.title = courseDto.title
            course.tag = courseDto.tag
            course.published = courseDto.published
            course.subject = courseDto.subject
            course.content = courseDto.content
            course = await courseRepository.save(course)
            response.addData("course", course)
        }
        return response
    } catch (e) {
        logger.error(`Updating a Course "${courseDto.title}" failed:` + e)
    }
}

export const getCourses = async (): Promise<Response> => {
    const courses = await courseRepository.findAll()
    return new Response().addData("courses", courses)
}

export const deleteCourse = async (uid: string): Promise<Response> => {
    try {
        const course = await courseRepository.findOrFail(uid)
        //TODO if course doesn't have course delete otherwise keep
        await courseRepository.remove(course)
        return new Response()
    } catch (e) {
        logger.error(`Delete course "${uid}" failed: ${e}`)
    }
}