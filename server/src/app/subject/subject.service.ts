import Response from "../../helpers/response";
import {SubjectDto} from "./subject.dto";
import logger from "../../helpers/logger";
import {slugify} from "../../helpers/string";
import SubjectRepository from "./subject.repository";
import Subject from "./subject.entity";
import * as fs from "fs";
import {remove} from "../../helpers/fileHelper";

const subjectRepository = new SubjectRepository()

const isSubjectValid = async (subject: string, response: Response): Promise<boolean> => {
    const existingSubject = await subjectRepository.findOneBySubject(subject)
    if (existingSubject) {
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
        const subjectIsValid = await isSubjectValid(subjectDto.subject, response)

        if (valid && subjectIsValid) {
            let subject = new Subject(subjectDto)
            subject.slug = slugify(subject.subject)
            subject.image = subjectDto.image
            subject = await subjectRepository.save(subject)
            response.addData("subject", subject)
        }
        return response
    } catch (e) {
        logger.error(`Create new Subject : ${subjectDto.subject} failed:` + e)
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
        logger.error(`Delete subject ${uid} failed: ${e}`)
    }
}