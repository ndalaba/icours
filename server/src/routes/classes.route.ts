import {Request, Response, Router} from "express";
import {createClasse, deleteClasse, getClasses, updateClasse} from "../app/classes/classe.service";
import {ClasseDto} from "../app/classes/classe.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = Router()

router.post('/', auth, admin, async (req: Request, res: Response) => {
    const response = await createClasse(new ClasseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("classe"), "Classe created", HttpStatusCode.CREATED)
})

router.put('/', auth, admin, async (req: Request, res: Response) => {
    const response = await updateClasse(new ClasseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData("classe"), "Classe updated", HttpStatusCode.OK)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getClasses()
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, response.getData('classes'))
})

router.delete("/:uid", auth, admin, async (req: Request, res: Response) => {
    const response = await deleteClasse(req.params.uid)
    return response.hasError() ? errorResponse(res, response.jsonErrors()) : successResponse(res, [])
})

export default router