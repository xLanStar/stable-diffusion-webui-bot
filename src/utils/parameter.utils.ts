import axios from "axios";
import { Message, MessageManager, RepliableInteraction } from "discord.js";
import { LocaleData } from "../i18n";
import logger from "../logger";
import { Methods } from "../types/enums";
import { Method, RequestInput } from "../types/type.js";
import { alertReply } from "./interaction.utils";

export const getLastParameterMessage = async (messages: MessageManager, message: Message): Promise<Message> => {
    let sourceMessage = message;
    while (!sourceMessage.embeds.length
        && sourceMessage.reference
        && sourceMessage.reference.messageId)
        sourceMessage = await messages.fetch(sourceMessage.reference.messageId)
    return sourceMessage;
}

const getFieldValue = (value: string) => value.substring(3, value.length - 3);

export const getRequestInput = async (interaction: RepliableInteraction, locale: LocaleData, message: Message, fetchImage: boolean = false): Promise<RequestInput> => {
    const embed = message.embeds[0];
    if (!embed) {
        alertReply(interaction, locale.exceptions.no_parameters)
        return null;
    }
    const method: Method = Methods[embed.author.name];
    logger.info(method);
    if (!method) {
        alertReply(interaction, locale.exceptions.no_parameters) // TODO message
        return null;
    }
    const fields = embed.fields;
    const [width, height] = getFieldValue(fields[5].value).split('x');
    const processImageUrl = message.attachments.first()?.url;
    return {
        method,
        parameter: {
            prompt: getFieldValue(fields[0].value),
            negative_prompt: getFieldValue(fields[1].value),
            sampler_index: getFieldValue(fields[2].value),
            steps: Number(getFieldValue(fields[3].value)),
            cfg_scale: Number(getFieldValue(fields[4].value)),
            width: Number(width),
            height: Number(height),
            batch_size: Number(getFieldValue(fields[6].value)),
            n_iter: Number(getFieldValue(fields[7].value)),
            seed: Number(getFieldValue(fields[8].value)),
            init_images: method === Methods.img2img && fetchImage && processImageUrl
                ? [await axios.get(processImageUrl, { responseType: "arraybuffer" })
                    .then(({ data }) => `data:image/jpeg;base64,${data.toString("base64")}`)]
                : []
        },
        processImageUrl
    }
};