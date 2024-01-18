import { Guild } from "discord.js";
import logger from "../../logger.ts";

export default {
  name: "guildDelete",
  async execute(guild: Guild) {
    logger.info(`leave guild`);
    logger.info(guild.id);
  },
};
