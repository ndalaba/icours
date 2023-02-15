import "reflect-metadata"
import DataSource from "./ormconfig"
import logger from "./helpers/logger";
import {bootstrap} from "./bootstrap";

bootstrap().listen(process.env.PORT, async () => {
    logger.info(`Express server running on http://localhost:${process.env.PORT}`)
    try {
        await DataSource.initialize();
        logger.info('Database connected')
    } catch (error) {
        logger.error(error)
    }
});