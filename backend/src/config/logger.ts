import pino from "pino";
import { env } from "./env";

// export const logger=pino({
//     level:process.env.NODE_ENV==="production"
//         ?"info"
//         :"debug",
    
//     transport:
//         process.env.NODE_ENV !=="production"
//             ? {
//                 target: "pino-pretty",
//                 options: {
//                     colorize: true,
//                 },
//             }
//             : undefined
// })

const loggerOptions = env.NODE_ENV==="production"
    ? {
        level:"info" as const
    }
    :{
        level:"debug" as const,
        transport:{
            target:"pino-pretty",
            options:{
                colorize:true,
            }
        }
    }

export const logger = pino(loggerOptions)