import { Guild } from "discord.js";
import logger from "../../logger.ts";

export default {
    name: 'guildCreate',
    execute: async (guild: Guild) => {
        logger.info(`join guild`)
        logger.info(guild.id);
    }
}