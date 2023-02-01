import {Request, Response, Router} from "express";
import {createClasse, deleteClasse, getClasses, updateClasse} from "../app/classes/classe.service";
import {ClasseDto} from "../app/classes/classe.dto";
import {errorResponse, successResponse} from "../helpers/response";
import HttpStatusCode from "../helpers/httpStatusCode";

const router = Router()

router.post('/',  async (req: Request, res: Response) => {
    const response = await createClasse(new ClasseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("classe"), "Classe created", HttpStatusCode.CREATED)
})

router.put('/', async (req: Request, res: Response) => {
    const response = await updateClasse(new ClasseDto(req.body))
    if (response.hasError())
        return errorResponse(res, response.jsonErrors())
    return successResponse(res, response.getData("classe"), "Classe updated", HttpStatusCode.OK)
})

router.get("/", async (_: Request, res: Response) => {
    const response = await getClasses()
    return successResponse(res, response.getData('classes'))
})

router.delete("/:uid", async (req: Request, res: Response) => {
    await deleteClasse(req.params.uid)
    return successResponse(res, [])
})

export default router