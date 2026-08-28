import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

const server=app.listen(env.PORT, ()=>{
    logger.info(`Backend of Taskflow is running on http://localhost:${env.PORT}`)
})

function shutdown(signal: string) {
    logger.info(`${signal} received. Shutting down...`);

    server.close(() => {
        logger.info("HTTP server closed");

        process.exit(0);
    });
}

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});

process.on("SIGINT", () => {
    shutdown("SIGINT");
});