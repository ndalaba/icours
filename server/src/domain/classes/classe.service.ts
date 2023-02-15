import Response from "../../helpers/response";
import {ClasseDto} from "./classe.dto";
import {generateUid, slugify} from "../../helpers/string";
import Classe from "./classe.entity";
import ClasseRepository from "./classe.repository";
import {tryCatch} from "../../helpers/functions";


export class ClasseService {
    constructor(private readonly repository = new ClasseRepository()) {
    }

    async createClasse(classeDto: ClasseDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await classeDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            const valid = !validation.hasError()
            const classeIsValid = await this.isClasseValid(classeDto, response)

            if (valid && classeIsValid) {
                let classe = new Classe(classeDto)
                classe.id = 0
                classe.uid = generateUid()
                classe.slug = slugify(classe.name)
                classe = await this.repository.save(classe)
                response.addData("classe", classe)
            }
            return response
        }, classeDto.name)
    }

    async updateClasse(classeDto: ClasseDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await classeDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            const valid = !validation.hasError()
            const classeIsValid = await this.isClasseValid(classeDto, response)

            if (valid && classeIsValid) {
                let classe = await this.repository.findOrFail(classeDto.uid)
                classe.slug = slugify(classeDto.name)
                classe.name = classeDto.name
                classe.description = classeDto.description
                classe = await this.repository.save(classe)
                response.addData("classe", classe)
            }
            return response
        }, classeDto.name)
    }

    async getClasses(): Promise<Response> {
        return tryCatch(async _ => {
            const classes = await this.repository.findAll()
            return new Response().addData("classes", classes)
        })
    }

    async deleteClasse(uid: string): Promise<Response> {
        return tryCatch(async _ => {
            const classe = await this.repository.findOrFail(uid)
            await this.repository.remove(classe)
            return new Response()
        }, uid)
    }

    async isClasseValid(classeDto: ClasseDto, response: Response): Promise<boolean> {
        const existingClasse = await this.repository.findOneByName(classeDto.name)
        if (existingClasse && existingClasse.id != classeDto.id) {
            response.addError("name", "Classe déjà enregistrée.")
            return false
        }
        return true
    }
}