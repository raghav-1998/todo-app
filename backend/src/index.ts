import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./db/prisma";

const server=app.listen(env.PORT, ()=>{
    logger.info(`Backend of Taskflow is running on http://localhost:${env.PORT}`)
})

const url = new URL(process.env.DATABASE_URL!);

console.log({
  host: url.hostname,
  port: url.port,
  database: url.pathname,
  username: url.username,
});
async function shutdown(signal: string) {
    logger.info(`${signal} received. Shutting down...`);
    
    server.close(async () => {
        await prisma.$disconnect();

        logger.info("HTTP server and database connection closed");

        process.exit(0);
    });
}

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});

process.on("SIGINT", () => {
    shutdown("SIGINT");
});