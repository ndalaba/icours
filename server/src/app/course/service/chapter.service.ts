import Response from "../../../helpers/response";
import {ChapterDto} from "../dto/chapter.dto";
import logger from "../../../helpers/logger";
import {generateUid, slugify} from "../../../helpers/string";
import ChapterRepository from "../repository/chapter.repository";
import Chapter from "../entity/chapter.entity";
import User from "../../user/user.entity";

const chapterRepository = new ChapterRepository()

export const createChapter = async (chapterDto: ChapterDto): Promise<Response> => {
    try {
        const validation = await chapterDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()

        if (valid) {
            let chapter = new Chapter(chapterDto)
            chapter.id = 0
            chapter.uid = generateUid()
            chapter.slug = slugify(chapter.title)
            chapter = await chapterRepository.save(chapter)
            response.addData("chapter", chapter)
        }
        return response
    } catch (e) {
        logger.error(`Create new Chapter : "${chapterDto.title}" failed:` + e)
        return new Response().addData('server', "Server error")
    }
}

export const updateChapter = async (chapterDto: ChapterDto): Promise<Response> => {
    try {
        let chapter = await chapterRepository.findOrFail(chapterDto.uid)
        if (!chapter.canEdit(chapterDto.user))
            throw new Error("Action not allowed")

        const validation = await chapterDto.validate()
        const response = new Response(new Map<string, any>(), validation.getErrors())

        const valid = !validation.hasError()

        if (valid) {
            chapter.slug = slugify(chapterDto.title)
            chapter.title = chapterDto.title
            chapter.published = chapterDto.published
            chapter.course = chapterDto.course
            chapter.content = chapterDto.content
            chapter = await chapterRepository.save(chapter)
            response.addData("chapter", chapter)
        }
        return response
    } catch (e) {
        logger.error(`Updating a Chapter "${chapterDto.title}" failed:` + e)
        return new Response().addData('server', "Server error")
    }
}

export const getChapters = async (course: any, published: any): Promise<Response> => {
    try {
        const courseId = course !== undefined ? +course : 0
        const isPublished = published !== undefined ? +published : 2
        const chapters = await chapterRepository.findAll(courseId, isPublished)
        return new Response().addData("chapters", chapters)
    } catch (e) {
        return new Response().addData('server', "Server error")
    }
}

export const getChapter = async (uid: any): Promise<Response> => {
    try {
        const chapter = await chapterRepository.findOrFail(uid)
        return new Response().addData("chapter", chapter)
    } catch (e) {
        return new Response().addData('server', "Server error")
    }
}

export const getChapterBySlug = async (slug: string): Promise<Response> => {
    const chapter = await chapterRepository.findOneBySlug(slug)
    return new Response().addData("chapter", chapter)
}

export const deleteChapter = async (uid: string, user: User): Promise<Response> => {
    try {
        const chapter = await chapterRepository.findOrFail(uid)
        if (!chapter.canEdit(user))
            throw new Error("Action not allowed")
        await chapterRepository.remove(chapter)
        return new Response()
    } catch (e) {
        logger.error(`Delete chapter "${uid}" failed: ${e}`)
        return new Response().addData('server', "Server error")
    }
}