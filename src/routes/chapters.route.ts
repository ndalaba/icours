import {Request, Response, Router} from "express";
import {
    createChapter,
    deleteChapter,
    getChapter, getChapterBySlug,
    getChapters,
    updateChapter
} from "../app/course/service/chapter.service";
import {ChapterDto} from "../app/course/dto/chapter.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";
import auth from "../middleware/auth";
import editor from "../middleware/editor";

const router = Router()

router.post('/', auth, editor, async (req: Request, res: Response) => {
    try {
        let dto = new ChapterDto(req.body)
        dto.user = res.locals.user
        const response = await createChapter(dto)
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("chapter"), "Chapter created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.put('/', auth, editor, async (req: Request, res: Response) => {
    try {
        let dto = new ChapterDto(req.body)
        dto.user = res.locals.user
        const response = await updateChapter(dto)
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("chapter"), "Chapter updated", HttpStatusCode.OK)
    } catch (e) {
        logger.error(e)
    }
})

router.get("/:courseId", async (req: Request, res: Response) => {
    try {
        const response = await getChapters(req.params.courseId, req.query.published)
        return successResponse(res, response.getData('chapters'))
    } catch (e) {
        logger.error(e)
    }
})

router.get("/chapter/slug/:slug", async (req: Request, res: Response) => {
    try {
        const response = await getChapterBySlug(req.params.slug)
        return successResponse(res, response.getData('chapter'))
    } catch (e) {
        logger.error(e)
    }
})


router.get("/:courseId/:chapterUid", async (req: Request, res: Response) => {
    try {
        const response = await getChapter(req.params.chapterUid)
        return successResponse(res, response.getData('chapter'))
    } catch (e) {
        logger.error(e)
    }
})


router.delete("/:uid", auth, editor, async (req: Request, res: Response) => {
    try {
        await deleteChapter(req.params.uid, res.locals.user)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router