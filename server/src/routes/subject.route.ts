import {Request, Response, Router} from "express";
import {createSubject, getSubjects} from "../app/subject/subject.service";
import {SubjectDto} from "../app/subject/subject.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";

const router = Router()
router.post('/', async (req: Request, res: Response) => {
    const response = await createSubject(new SubjectDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("subject"), "Subject created", HttpStatusCode.CREATED)
})
router.get("/", async (_: Request, res: Response) => {
    const response = await getSubjects()
    return successResponse(res, response.getData('subjects'))
})

export default router