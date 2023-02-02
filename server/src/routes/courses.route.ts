import {Request, Response, Router} from "express";
import {createCourse, deleteCourse, getCourses, updateCourse} from "../app/course/course.service";
import {CourseDto} from "../app/course/course.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    const response = await createCourse(new CourseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("course"), "Course created", HttpStatusCode.CREATED)
})

router.put('/', async (req: Request, res: Response) => {
    const response = await updateCourse(new CourseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("course"), "Course updated", HttpStatusCode.OK)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getCourses()
    return successResponse(res, response.getData('courses'))
})

router.delete("/:uid", async (req: Request, res: Response) => {
    await deleteCourse(req.params.uid)
    return successResponse(res, [])
})

export default router