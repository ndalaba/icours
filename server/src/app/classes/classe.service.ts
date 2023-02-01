import Response from "../../helpers/response";
import {ClasseDto} from "./classe.dto";
import logger from "../../helpers/logger";
import {generateUid, slugify} from "../../helpers/string";
import ClasseRepository from "./classe.repository";
import Classe from "./classe.entity";

const classeRepository = new ClasseRepository()

const isClasseValid = async (classeDto: ClasseDto, response: Response): Promise<boolean> => {
    const existingClasse = await classeRepository.findOneByName(classeDto.name)
    if (existingClasse && existingClasse.id != classeDto.id) {
        response.addError("name", "Classe déjà enregistrée.")
        return false
    }
    return true
}

export const createClasse = async (classeDto: ClasseDto): Promise<Response> => {
    try {
        const validation = await classeDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()
        const classeIsValid = await isClasseValid(classeDto, response)

        if (valid && classeIsValid) {
            let classe = new Classe(classeDto)
            classe.id = 0
            classe.uid = generateUid()
            classe.slug = slugify(classe.name)
            classe = await classeRepository.save(classe)
            response.addData("classe", classe)
        }
        return response
    } catch (e) {
        logger.error(`Create new Classe : "${classeDto.name}" failed:` + e)
    }
}

export const updateClasse = async (classeDto: ClasseDto): Promise<Response> => {
    try {
        const validation = await classeDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()
        const classeIsValid = await isClasseValid(classeDto, response)

        if (valid && classeIsValid) {
            let classe = await classeRepository.findOrFail(classeDto.uid)
            classe.slug = slugify(classeDto.name)
            classe.name = classeDto.name
            classe.description = classeDto.description
            classe = await classeRepository.save(classe)
            response.addData("classe", classe)
        }
        return response
    } catch (e) {
        logger.error(`Updating a Classe "${classeDto.name}" failed:` + e)
    }
}

export const getClasses = async (): Promise<Response> => {
    const classes = await classeRepository.findAll()
    return new Response().addData("classes", classes)
}

export const deleteClasse = async (uid: string): Promise<Response> => {
    try {
        const classe = await classeRepository.findOrFail(uid)
        //TODO if classe doesn't have course delete otherwise keep
        await classeRepository.remove(classe)
        return new Response()
    } catch (e) {
        logger.error(`Delete classe "${uid}" failed: ${e}`)
    }
}