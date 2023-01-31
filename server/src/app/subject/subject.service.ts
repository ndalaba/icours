import Response from "../../helpers/response";
import {SubjectDto} from "./subject.dto";
import logger from "../../helpers/logger";
import {generateUid, slugify} from "../../helpers/string";
import SubjectRepository from "./subject.repository";
import Subject from "./subject.entity";
import {remove} from "../../helpers/fileHelper";

const subjectRepository = new SubjectRepository()

const isSubjectValid = async (subjectDto: SubjectDto, response: Response): Promise<boolean> => {
    const existingSubject = await subjectRepository.findOneBySubject(subjectDto.subject)
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
            subject.slug = slugify(subject.subject)
            subject.image = subjectDto.image
            subject = await subjectRepository.save(subject)
            response.addData("subject", subject)
        }else{
            if (subjectDto.image !== undefined) {
                remove(subjectDto.image)
            }
        }

        return response
    } catch (e) {
        logger.error(`Create new Subject : "${subjectDto.subject}" failed:` + e)
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
            subject.slug = slugify(subjectDto.subject)
            subject.subject = subjectDto.subject
            subject.description = subjectDto.description
            if (subjectDto.image !== undefined) {
                remove(subject.image)
                subject.image = subjectDto.image
            }
            subject = await subjectRepository.save(subject)
            response.addData("subject", subject)
        }else{
            if (subjectDto.image !== undefined) {
                remove(subjectDto.image)
            }
        }

        return response
    } catch (e) {
        logger.error(`Updating a Subject "${subjectDto.subject}" failed:` + e)
    }
}

export const getSubjects = async (): Promise<Response> => {
    const subjects = await subjectRepository.findAll()
    return new Response().addData("subjects", subjects)
}

export const deleteSubject = async (uid: string): Promise<Response> => {
    try {
        const subject = await subjectRepository.findOrFail(uid)
        //TODO if subject doesn't have course delete otherwise keep
        remove(subject.image)
        await subjectRepository.remove(subject)
        return new Response()
    } catch (e) {
        logger.error(`Delete subject "${uid}" failed: ${e}`)
    }
}