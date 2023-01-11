import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (_: Request, res: Response) => {
    res.render("home")
})

export default router