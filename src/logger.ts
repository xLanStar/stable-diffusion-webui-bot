import { pino } from "pino";
import { exit } from "process";

const logger = pino();

export const fatal = (reason?: any) => {
    logger.fatal(reason);
    exit();
}

export default logger;