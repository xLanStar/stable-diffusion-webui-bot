import { Guild } from "discord.js";
import logger from "../../logger.ts";

export default {
    name: 'guildDelete',
    execute: async (guild : Guild) => {
        logger.info(`leave guild`)
        logger.info(guild.id);
    }
}