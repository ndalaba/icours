import {Request, Response, Router} from "express";
import {createSubject, deleteSubject, getSubject, getSubjects, updateSubject} from "../app/subject/subject.service";
import {SubjectDto} from "../app/subject/subject.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import {upload} from "../helpers/fileHelper";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = Router()

router.post('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
    const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
    const response = await createSubject(new SubjectDto(body))
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("subject"), "Subject created", HttpStatusCode.CREATED)
})

router.put('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
    const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
    const response = await updateSubject(new SubjectDto(body))
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("subject"), "Subject updated", HttpStatusCode.OK)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getSubjects()
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('subjects'))
})

router.get("/:slug", async (req: Request, res: Response) => {
    const response = await getSubject(req.params.slug)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('subject'))
})

router.delete("/:uid", auth, admin, async (req: Request, res: Response) => {
    const response = await deleteSubject(req.params.uid)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
})

export default router