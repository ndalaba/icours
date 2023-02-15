import {Request, Response, Router} from "express";
import {ClasseDto} from "../domain/classes/classe.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import {ClasseService} from "../domain/classes/classe.service";

export class ClasseController {
    constructor(private readonly classeService = new ClasseService(), private readonly router = Router()) {
    }

    routes() {

        this.router.put('/', auth, admin, async (req: Request, res: Response) => {
            const response = await this.classeService.updateClasse(new ClasseDto(req.body))
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("classe"), "Classe updated", HttpStatusCode.OK)
        })

        this.router.get("/", async (_: Request, res: Response) => {
            const response = await this.classeService.getClasses()
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('classes'))
        })

        this.router.post('/', auth, admin, async (req: Request, res: Response) => {
            const response = await this.classeService.createClasse(new ClasseDto(req.body))
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("classe"), "Classe created", HttpStatusCode.CREATED)
        })

        this.router.delete("/:uid", auth, admin, async (req: Request, res: Response) => {
            const response = await this.classeService.deleteClasse(req.params.uid)
            return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
        })

        return this.router
    }
}