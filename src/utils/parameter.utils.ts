import { Embed as DiscordEmbed, Message, MessageManager } from "discord.js";
import { Parameter } from "../types.js";

export const getLastParameterMessage = async (messages: MessageManager, message: Message): Promise<Message> => {
    let sourceMessage = message;
    while (!sourceMessage.embeds.length
        && sourceMessage.reference
        && sourceMessage.reference.messageId)
        sourceMessage = await messages.fetch(sourceMessage.reference.messageId)
    return sourceMessage;
}

export const getParameter = (embed: DiscordEmbed): Parameter => {
    const fields = embed.fields;
    // logger.info({
    //     prompt: fields[0].value,
    //     negative_prompt: fields[1].value,
    //     sampler_index: fields[2].value,
    //     steps: Number(fields[3].value),
    //     cfg_scale: Number(fields[4].value),
    //     width: Number(fields[5].value),
    //     height: Number(fields[6].value),
    //     seed: Number(fields[7].value),
    //     batch_size: Number(fields[8].value),
    //     n_iter: Number(fields[9].value)
    // });
    return {
        prompt: fields[0].value,
        negative_prompt: fields[1].value,
        sampler_index: fields[2].value,
        steps: Number(fields[3].value),
        cfg_scale: Number(fields[4].value),
        width: Number(fields[5].value),
        height: Number(fields[6].value),
        seed: Number(fields[7].value),
        batch_size: Number(fields[8].value),
        n_iter: Number(fields[9].value)
    }
};