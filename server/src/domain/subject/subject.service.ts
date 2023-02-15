import Response from "../../helpers/response";
import {generateUid, slugify} from "../../helpers/string";
import {remove} from "../../helpers/fileHelper";
import {tryCatch} from "../../helpers/functions";
import SubjectRepository from "./subject.repository";
import {SubjectDto} from "./subject.dto";
import Subject from "./subject.entity";

export class SubjectService {
    constructor(private readonly repository = new SubjectRepository()) {
    }

    async createSubject(subjectDto: SubjectDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await subjectDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            const valid = !validation.hasError()
            const subjectIsValid = await this.isSubjectValid(subjectDto, response)

            if (valid && subjectIsValid) {
                let subject = new Subject(subjectDto)
                subject.id = 0
                subject.uid = generateUid()
                subject.slug = slugify(subject.name)
                subject.image = subjectDto.image
                subject = await this.repository.save(subject)
                response.addData("subject", subject)
            } else if (subjectDto.image !== undefined) remove(subjectDto.image)
            return response
        }, subjectDto.name)
    }

    async updateSubject(subjectDto: SubjectDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await subjectDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            const valid = !validation.hasError()
            const subjectIsValid = await this.isSubjectValid(subjectDto, response)

            if (valid && subjectIsValid) {
                let subject = await this.repository.findOrFail(subjectDto.uid)
                subject.slug = slugify(subjectDto.name)
                subject.name = subjectDto.name
                subject.description = subjectDto.description
                if (subjectDto.image !== undefined) {
                    remove(subject.image)
                    subject.image = subjectDto.image
                }
                subject = await this.repository.save(subject)
                response.addData("subject", subject)
            } else {
                if (subjectDto.image !== undefined) {
                    remove(subjectDto.image)
                }
            }
            return response
        }, subjectDto.name)
    }

    async getSubjects(): Promise<Response> {
        return tryCatch(async () => {
            const subjects = await this.repository.findAll()
            return new Response().addData("subjects", subjects)
        })
    }

    async getSubject(slug: string): Promise<Response> {
        return tryCatch(async () => {
            const subject = await this.repository.findOneBySlug(slug)
            return new Response().addData("subject", subject)
        }, slug)
    }

    async deleteSubject(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const subject = await this.repository.findOrFail(uid)
            const coursesCount = await this.repository.countCourses(subject.id)
            if (coursesCount)
                return new Response().addError("subject", "Cette matière a des cours associés.")
            remove(subject.image)
            await this.repository.remove(subject)
            return new Response()
        }, uid)
    }

    private async isSubjectValid(subjectDto: SubjectDto, response: Response): Promise<boolean> {
        const existingSubject = await this.repository.findOneByName(subjectDto.name)
        if (existingSubject && existingSubject.id != subjectDto.id) {
            response.addError("subject", "Matière déjà enregistrée.")
            return false
        }
        return true
    }
}