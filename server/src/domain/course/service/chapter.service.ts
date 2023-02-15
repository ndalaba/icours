import Response from "../../../helpers/response";
import {ChapterDto} from "../dto/chapter.dto";
import {generateUid, slugify} from "../../../helpers/string";
import ChapterRepository from "../repository/chapter.repository";
import Chapter from "../entity/chapter.entity";
import User from "../../user/user.entity";
import {tryCatch} from "../../../helpers/functions";


export class ChapterService {
    constructor(private readonly chapterRepository = new ChapterRepository()) {
    }


    async createChapter(chapterDto: ChapterDto): Promise<Response> {
        return tryCatch(async _ => {
            const validation = await chapterDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            if (!validation.hasError()) {
                let chapter = new Chapter(chapterDto)
                chapter.id = 0
                chapter.uid = generateUid()
                chapter.slug = slugify(chapter.title)
                chapter = await this.chapterRepository.save(chapter)
                response.addData("chapter", chapter)
            }
            return response
        }, chapterDto.title)
    }

    async updateChapter(chapterDto: ChapterDto): Promise<Response> {
        return tryCatch(async _ => {
            let chapter = await this.chapterRepository.findOrFail(chapterDto.uid)
            if (!chapter.canEdit(chapterDto.user))
                throw new Error("Action not allowed")

            const validation = await chapterDto.validate()
            const response = new Response(new Map<string, any>(), validation.getErrors())

            if (!validation.hasError()) {
                chapter.slug = slugify(chapterDto.title)
                chapter.title = chapterDto.title
                chapter.published = chapterDto.published
                chapter.course = chapterDto.course
                chapter.content = chapterDto.content
                chapter = await this.chapterRepository.save(chapter)
                response.addData("chapter", chapter)
            }
            return response
        }, chapterDto.title)
    }

    async getChapters(course: any, published: any): Promise<Response> {
        return tryCatch(async _ => {
            const courseId = course !== undefined ? +course : 0
            const isPublished = published !== undefined ? +published : 2
            const chapters = await this.chapterRepository.findAll(courseId, isPublished)
            return new Response().addData("chapters", chapters)
        })
    }

    async getChapter(uid: any): Promise<Response> {
        return tryCatch(async _ => {
            const chapter = await this.chapterRepository.findOrFail(uid)
            return new Response().addData("chapter", chapter)
        }, uid)
    }

    async getChapterBySlug(slug: string): Promise<Response> {
        return tryCatch(async _ => {
            const chapter = await this.chapterRepository.findOneBySlug(slug)
            return new Response().addData("chapter", chapter)
        }, slug)
    }

    async deleteChapter(uid: string, user: User): Promise<Response> {
        return tryCatch(async _ => {
            const chapter = await this.chapterRepository.findOrFail(uid)
            if (!chapter.canEdit(user))
                throw new Error("Action not allowed")
            await this.chapterRepository.remove(chapter)
            return new Response()
        }, uid)
    }
}