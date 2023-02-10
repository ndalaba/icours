import Response from "../../helpers/response";
import {SubjectDto} from "./subject.dto";
import logger from "../../helpers/logger";
import {generateUid, slugify} from "../../helpers/string";
import SubjectRepository from "./subject.repository";
import Subject from "./subject.entity";
import {remove} from "../../helpers/fileHelper";

const subjectRepository = new SubjectRepository()

const isSubjectValid = async (subjectDto: SubjectDto, response: Response): Promise<boolean> => {
    const existingSubject = await subjectRepository.findOneByName(subjectDto.name)
    if (existingSubject && existingSubject.id != subjectDto.id) {
        response.addError("subject", "Matière déjà enregistrée.")
        return false
    }
    return true
}

export const createSubject = async (subjectDto: SubjectDto): Promise<Response> => {
    try {
        const validation = await subjectDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()
        const subjectIsValid = await isSubjectValid(subjectDto, response)

        if (valid && subjectIsValid) {
            let subject = new Subject(subjectDto)
            subject.id = 0
            subject.uid = generateUid()
            subject.slug = slugify(subject.name)
            subject.image = subjectDto.image
            subject = await subjectRepository.save(subject)
            response.addData("subject", subject)
        } else {
            if (subjectDto.image !== undefined) {
                remove(subjectDto.image)
            }
        }

        return response
    } catch (e) {
        logger.error(`Create new Subject : "${subjectDto.name}" failed:` + e)
        return new Response().addError('server', "Server error")
    }
}

export const updateSubject = async (subjectDto: SubjectDto): Promise<Response> => {
    try {
        const validation = await subjectDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()
        const subjectIsValid = await isSubjectValid(subjectDto, response)

        if (valid && subjectIsValid) {
            let subject = await subjectRepository.findOrFail(subjectDto.uid)
            subject.slug = slugify(subjectDto.name)
            subject.name = subjectDto.name
            subject.description = subjectDto.description
            if (subjectDto.image !== undefined) {
                remove(subject.image)
                subject.image = subjectDto.image
            }
            subject = await subjectRepository.save(subject)
            response.addData("subject", subject)
        } else {
            if (subjectDto.image !== undefined) {
                remove(subjectDto.image)
            }
        }
        return response
    } catch (e) {
        logger.error(`Updating a Subject "${subjectDto.name}" failed:` + e)
        return new Response().addError('server', "Server error")
    }
}

export const getSubjects = async (): Promise<Response> => {
    try {
        const subjects = await subjectRepository.findAll()
        return new Response().addData("subjects", subjects)
    } catch (e) {
        logger.error(`Get subjects failed: ${e}`)
        return new Response().addError('server', "Server error")
    }
}

export const getSubject = async (slug: string): Promise<Response> => {
    try {
        const subject = await subjectRepository.findOneBySlug(slug)
        return new Response().addData("subject", subject)
    } catch (e) {
        logger.error(`Get subject "${slug}" failed: ${e}`)
        return new Response().addError('server', "Server error")
    }
}

export const deleteSubject = async (uid: string): Promise<Response> => {
    try {
        const subject = await subjectRepository.findOrFail(uid)
        const coursesCount = await subjectRepository.countCourses(subject.id)
        if (coursesCount)
            return new Response().addError("subject", "Cette matière a des cours associés.")
        remove(subject.image)
        await subjectRepository.remove(subject)
        return new Response()
    } catch (e) {
        logger.error(`Delete subject "${uid}" failed: ${e}`)
        return new Response().addError('server', "Server error")
    }
}