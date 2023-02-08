import {Request, Response, Router} from "express";
import {createSubject, deleteSubject, getSubject, getSubjects, updateSubject} from "../app/subject/subject.service";
import {SubjectDto} from "../app/subject/subject.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import {upload} from "../helpers/fileHelper";
import logger from "../helpers/logger";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = Router()

router.post('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
    try {
        const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
        const response = await createSubject(new SubjectDto(body))
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("subject"), "Subject created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.put('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
    try {
        const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
        const response = await updateSubject(new SubjectDto(body))
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("subject"), "Subject updated", HttpStatusCode.OK)
    } catch (e) {
        logger.error(e)
    }
})

router.get("/", async (_: Request, res: Response) => {
    try {
        const response = await getSubjects()
        return successResponse(res, response.getData('subjects'))
    } catch (e) {
        logger.error(e)
    }
})

router.get("/:slug", async (req: Request, res: Response) => {
    try {
        const response = await getSubject(req.params.slug)
        return successResponse(res, response.getData('subject'))
    } catch (e) {
        logger.error(e)
    }
})

router.delete("/:uid", auth, admin, async (req: Request, res: Response) => {
    try {
        await deleteSubject(req.params.uid)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router