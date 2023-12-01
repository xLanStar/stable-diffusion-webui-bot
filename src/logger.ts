import { pino } from "pino";
import { exit } from "process";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

export const fatal = (reason?: any) => {
  logger.fatal(reason);
  exit();
};

export default logger;
