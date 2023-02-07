import {Request, Response, Router} from "express";
import {createCourse, deleteCourse, getCourse, getCourses, updateCourse} from "../app/course/service/course.service";
import {CourseDto} from "../app/course/dto/course.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";
import auth from "../middleware/auth";
import editor from "../middleware/editor";

const router = Router()

router.post('/', auth, editor, async (req: Request, res: Response) => {
    try {
        let dto = new CourseDto(req.body)
        dto.user = res.locals.user
        const response = await createCourse(dto)
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("course"), "Course created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.put('/', auth, editor, async (req: Request, res: Response) => {
    try {
        let dto = new CourseDto(req.body)
        dto.user = res.locals.user
        const response = await updateCourse(dto)
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("course"), "Course updated", HttpStatusCode.OK)
    } catch (e) {
        logger.error(e)
    }
})

router.get("/", async (req: Request, res: Response) => {
    try {
        const response = await getCourses(req.query.subject, req.query.classe, req.query.published)
        return successResponse(res, response.getData('courses'))
    } catch (e) {
        logger.error(e)
    }
})

router.get("/:uid", async (req: Request, res: Response) => {
    try {
        const response = await getCourse(req.params.uid as string)
        return successResponse(res, response.getData('course'))
    } catch (e) {
        logger.error(e)
    }
})

router.delete("/:uid", auth, editor, async (req: Request, res: Response) => {
    try {
        await deleteCourse(req.params.uid, res.locals.user)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router