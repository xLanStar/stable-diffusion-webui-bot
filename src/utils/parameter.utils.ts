import { Embed as DiscordEmbed, Message, MessageManager } from "discord.js";
import { Parameter } from "../types/type.js";

export const getLastParameterMessage = async (messages: MessageManager, message: Message): Promise<Message> => {
    let sourceMessage = message;
    while (!sourceMessage.embeds.length
        && sourceMessage.reference
        && sourceMessage.reference.messageId)
        sourceMessage = await messages.fetch(sourceMessage.reference.messageId)
    return sourceMessage;
}

const getFieldValue = (value: string) => value.substring(3, value.length - 3);

export const getParameter = (embed: DiscordEmbed): Parameter => {
    const fields = embed.fields;
    const [width, height] = getFieldValue(fields[5].value).split('x');
    return {
        prompt: getFieldValue(fields[0].value),
        negative_prompt: getFieldValue(fields[1].value),
        sampler_index: getFieldValue(fields[2].value),
        steps: Number(getFieldValue(fields[3].value)),
        cfg_scale: Number(getFieldValue(fields[4].value)),
        width: Number(width),
        height: Number(height),
        batch_size: Number(getFieldValue(fields[6].value)),
        n_iter: Number(getFieldValue(fields[7].value)),
        seed: Number(getFieldValue(fields[8].value))
    }
};