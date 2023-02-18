import logger from "./logger";
import Response from "./response";

export const tryCatch = async (fn: Function, value: any = null) => {

    return Promise.resolve(fn()).catch(e => {
        logger.error(`${fn.name} - ${value} (${e.message})`)
        if (process.env.NODE_ENV === "dev")
            return new Response().addError('server', e.message)
        else
            return new Response().addError('server', "Server error")
    })
}