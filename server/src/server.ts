import "reflect-metadata"
import app from "./app"
import DataSource from "./ormconfig"
import logger from "./helpers/logger";

app.listen(process.env.PORT, async () => {
    logger.info(`Express server running on http://localhost:${process.env.PORT}`)
    try {
        await DataSource.initialize();
        logger.info('Database connected')
    } catch (error) {
        logger.error(error)
    }
});