import { Channel } from "discord.js";
import logger from "../../logger.ts";

export default {
  name: "channelDelete",
  execute: async (channel: Channel) => {
    logger.info(
      {
        id: channel.id,
        isDMBased: channel.isDMBased(),
        isTextBased: channel.isTextBased(),
        isThread: channel.isThread(),
        isVoiceBased: channel.isVoiceBased(),
      },
      "deleted channel:"
    );
  },
};
