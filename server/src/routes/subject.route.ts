import {Request, Response, Router} from "express";
import {createSubject, deleteSubject, getSubjects} from "../app/subject/subject.service";
import {SubjectDto} from "../app/subject/subject.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import {upload} from "../helpers/fileHelper";

const router = Router()

router.post('/', upload("subjects").single('image'), async (req: Request, res: Response) => {
    const body = req.file !== undefined ? {...req.body, image: "subjects/" + req.file?.filename} : req.body
    const response = await createSubject(new SubjectDto(body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("subject"), "Subject created", HttpStatusCode.CREATED)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getSubjects()
    return successResponse(res, response.getData('subjects'))
})

router.delete("/:uid", async (req: Request, res: Response) => {
    await deleteSubject(req.params.uid)
    return successResponse(res, [])
})

export default router