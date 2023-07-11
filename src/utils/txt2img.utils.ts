import { ButtonInteraction, InteractionResponse, Message } from "discord.js";
import ProgressBuilder from "../builders/progress.builder.ts";
import Txt2imgResultBuilder from "../builders/txt2imgResult.builder.ts";
import { LocaleData } from "../i18n.ts";
import logger from "../logger.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { Parameter, Progress } from "../types.js";

const { PROGRESS_INTERVAL } = process.env;

const progressInterval = Number(PROGRESS_INTERVAL) || 1000;
if (!Number(PROGRESS_INTERVAL))
    logger.warn("Progress interval is empty. It has been set to default(1000)");

export const handleTxt2img = async (interaction: ButtonInteraction, message: Message, locale: LocaleData, data: Parameter) => {
    let progressing: InteractionResponse<true>;
    interaction.deferReply().then(v => progressing = v);
    const interval = setInterval(() =>
        stableDiffusion.requestProgress().then((progress: Progress) =>
            (progressing) && progressing.edit(ProgressBuilder.build(locale, progress)))
        , progressInterval)
    stableDiffusion.requestTxt2Img(data)
        .then(async (images: string[]) => {
            progressing.delete();
            progressing = null;
            clearInterval(interval);
            message.reply(Txt2imgResultBuilder.build(locale, images))
        })
        .catch(err => {
            logger.error(err);
            interaction.editReply({
                content: locale.exceptions.unknown
            })
        })
}