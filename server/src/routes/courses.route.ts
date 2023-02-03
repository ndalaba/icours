import {Request, Response, Router} from "express";
import {createCourse, deleteCourse, getCourse, getCourses, updateCourse} from "../app/course/service/course.service";
import {CourseDto} from "../app/course/dto/course.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const response = await createCourse(new CourseDto(req.body))
        if (response.hasError())
            return errorResponse(res, response.jsonErrors())
        return successResponse(res, response.getData("course"), "Course created", HttpStatusCode.CREATED)
    } catch (e) {
        logger.error(e)
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        const response = await updateCourse(new CourseDto(req.body))
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

router.delete("/:uid", async (req: Request, res: Response) => {
    try {
        await deleteCourse(req.params.uid)
        return successResponse(res, [])
    } catch (e) {
        logger.error(e)
    }
})

export default router