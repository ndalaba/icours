import {Request, Response, Router} from "express";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import {upload} from "../helpers/fileHelper";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import {SubjectService} from "../domain/subject/subject.service";
import {SubjectDto} from "../domain/subject/subject.dto";

export class SubjectController {
    constructor(private readonly subjectService = new SubjectService(), private readonly router = Router()) {}

    routes() {
        this.router.post('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
            const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
            const response = await this.subjectService.createSubject(new SubjectDto(body))
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("subject"), "Subject created", HttpStatusCode.CREATED)
        })

        this.router.put('/', auth, admin, upload("subjects").single('image'), async (req: Request, res: Response) => {
            const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
            const response = await this.subjectService.updateSubject(new SubjectDto(body))
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("subject"), "Subject updated", HttpStatusCode.OK)
        })

        this.router.get("/", async (_: Request, res: Response) => {
            const response = await this.subjectService.getSubjects()
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('subjects'))
        })

        this.router.get("/:slug", async (req: Request, res: Response) => {
            const response = await this.subjectService.getSubject(req.params.slug)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('subject'))
        })

        this.router.delete("/:uid", auth, admin, async (req: Request, res: Response) => {
            const response = await this.subjectService.deleteSubject(req.params.uid)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
        })
        return this.router
    }
}