import { Channel } from "discord.js";
import logger from "../../logger.ts";

export default {
    name: 'channelDelete',
    execute: async (channel: Channel) => {
        logger.info(`join channel`)
        logger.info(channel.id, channel.isDMBased(), channel.isTextBased(), channel.isThread(), channel.isVoiceBased());
    }
}