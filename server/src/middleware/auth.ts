import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";
import * as jwt from "jsonwebtoken"
import { UserRepository } from "../app/user/user.repository";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("auth")
        const token = req.cookies.token

        if (!token) return next()

        const  email : any = jwt.verify(token, process.env.SECRET_KEY!)

        const user = await new UserRepository().findOneByEmail(email)

        if (!user) throw new Error('Unauthenticated')

        res.locals.user = user
        
        return next()

    } catch (error) {
        logger.error(error)
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthenticated' })
    }
}