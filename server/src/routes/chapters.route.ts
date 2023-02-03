import {Request, Response, Router} from "express";
import {createChapter, deleteChapter, getChapters, updateChapter} from "../app/course/service/chapter.service";
import {ChapterDto} from "../app/course/dto/chapter.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const response = await createChapter(new ChapterDto(req.body))
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("chapter"), "Chapter created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        const response = await updateChapter(new ChapterDto(req.body))
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

router.delete("/:uid", async (req: Request, res: Response) => {
    try {
        await deleteChapter(req.params.uid)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router