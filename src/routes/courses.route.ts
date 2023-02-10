import {Request, Response, Router} from "express";
import {
    createCourse,
    deleteCourse,
    getCourse,
    getCourseBySlug,
    getCourses,
    updateCourse
} from "../app/course/service/course.service";
import {CourseDto} from "../app/course/dto/course.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import auth from "../middleware/auth";
import editor from "../middleware/editor";

const router = Router()

router.post('/', auth, editor, async (req: Request, res: Response) => {
    let dto = new CourseDto(req.body)
    dto.user = res.locals.user
    const response = await createCourse(dto)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("course"), "Course created", HttpStatusCode.CREATED)
})

router.put('/', auth, editor, async (req: Request, res: Response) => {
    let dto = new CourseDto(req.body)
    dto.user = res.locals.user
    const response = await updateCourse(dto)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("course"), "Course updated", HttpStatusCode.OK)
})

router.get("/", async (req: Request, res: Response) => {
    const response = await getCourses(req.query.subject, req.query.classe, req.query.published)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('courses'))
})

router.get("/:uid", async (req: Request, res: Response) => {
    const response = await getCourse(req.params.uid as string)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('course'))
})

router.get("/course/:slug", async (req: Request, res: Response) => {
    const response = await getCourseBySlug(req.params.slug as string)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('course'))
})

router.delete("/:uid", auth, editor, async (req: Request, res: Response) => {
    const response = await deleteCourse(req.params.uid, res.locals.user)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
})

export default router