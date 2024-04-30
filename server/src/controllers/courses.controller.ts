import {Request, Response, Router} from "express";
import {CourseDto} from "../domain/course/dto/course.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import auth from "../middleware/auth";
import editor from "../middleware/editor";
import {CourseService} from "../domain/course/service/course.service";


export class CourseController {
    constructor(private readonly courseService = new CourseService(), private readonly router = Router()) {
    }

    routes() {

        this.router.post('/', auth, editor, async (req: Request, res: Response) => {
            const dto = new CourseDto(req.body)
            dto.user = res.locals.user
            const response = await this.courseService.createCourse(dto)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("course"), "Course created", HttpStatusCode.CREATED)
        })

        this.router.put('/', auth, editor, async (req: Request, res: Response) => {
            const dto = new CourseDto(req.body)
            dto.user = res.locals.user
            const response = await this.courseService.updateCourse(dto)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("course"), "Course updated", HttpStatusCode.OK)
        })

        this.router.get("/", async (req: Request, res: Response) => {
            const response = await this.courseService.getCourses(req.query.subject, req.query.classe, req.query.published)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('courses'))
        })

        this.router.get("/:uid", async (req: Request, res: Response) => {
            const response = await this.courseService.getCourse(req.params.uid as string)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('course'))
        })

        this.router.get("/course/:slug", async (req: Request, res: Response) => {
            const response = await this.courseService.getCourseBySlug(req.params.slug as string)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('course'))
        })

        this.router.delete("/:uid", auth, editor, async (req: Request, res: Response) => {
            const response = await this.courseService.deleteCourse(req.params.uid, res.locals.user)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
        })
        return this.router
    }
}