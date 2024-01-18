import bot from "../../bot.ts";
import logger from "../../logger.ts";

export default {
  name: "ready",
  once: true,
  async execute() {
    logger.info(`Ready ${bot.user?.tag} ${bot.user.id}`);
  },
};
