import logger from "./logger";
import Response from "./response";

export const tryCatch = (fn: Function, value: any = null) => {
    try {
        return fn()
    } catch (e) {
        logger.error(`${fn.name} - ${value} (${e})`)
        if (process.env.NODE_ENV === "dev")
            return new Response().addError('server', e.message)
        else
            return new Response().addError('server', "Server error")
    }
}