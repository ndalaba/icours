import {NextFunction, Request, Response} from "express";
import HttpStatusCode from "../helpers/httpStatusCode";
import logger from "../helpers/logger";
import User, {Role} from "../domain/user/user.entity";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user: User = res.locals.user

        if (!user) throw new Error('Unauthenticated')

        if (!user.hasAnyRole([Role.ROLE_ADMIN, Role.ROLE_SUPER_ADMIN])) throw  new Error('Unauthorized')

        return next()

    } catch (error) {
        logger.error(error)
        return res.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized'})
    }
}