import {Request, Response, Router} from "express";
import {ChapterDto} from "../domain/course/dto/chapter.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import auth from "../middleware/auth";
import editor from "../middleware/editor";
import {ChapterService} from "../domain/course/service/chapter.service";

export class ChapterController {
    constructor(private readonly chapterService = new ChapterService(), private readonly router = Router()) {
    }

    routes() {
        this.router.post('/', auth, editor, async (req: Request, res: Response) => {
            let dto = new ChapterDto(req.body)
            dto.user = res.locals.user
            const response = await this.chapterService.createChapter(dto)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("chapter"), "Chapter created", HttpStatusCode.CREATED)
        })

        this.router.put('/', auth, editor, async (req: Request, res: Response) => {
            let dto = new ChapterDto(req.body)
            dto.user = res.locals.user
            const response = await this.chapterService.updateChapter(dto)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("chapter"), "Chapter updated", HttpStatusCode.OK)
        })

        this.router.get("/:courseId", async (req: Request, res: Response) => {
            const response = await this.chapterService.getChapters(req.params.courseId, req.query.published)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('chapters'))
        })

        this.router.get("/chapter/slug/:slug", async (req: Request, res: Response) => {
            const response = await this.chapterService.getChapterBySlug(req.params.slug)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('chapter'))
        })


        this.router.get("/:courseId/:chapterUid", async (req: Request, res: Response) => {
            const response = await this.chapterService.getChapter(req.params.chapterUid)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('chapter'))
        })

        this.router.delete("/:uid", auth, editor, async (req: Request, res: Response) => {
            const response = await this.chapterService.deleteChapter(req.params.uid, res.locals.user)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
        })

        return this.router
    }
}