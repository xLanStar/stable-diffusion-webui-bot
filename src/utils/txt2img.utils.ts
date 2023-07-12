import { ButtonInteraction, Message } from "discord.js";
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
    let progressing: Message<boolean>;
    interaction.deferReply({ fetchReply: true }).then(message => progressing = message);
    const interval = setInterval(() =>
        stableDiffusion.requestProgress().then((progress: Progress) => {
            logger.info(`progressing: ${progress.progress}`)
            if (progressing && progress.current_image) progressing.edit(ProgressBuilder.build(locale, progress))
        }), progressInterval)
    stableDiffusion.requestTxt2Img(data)
        .then(async (images: string[]) => {
            clearInterval(interval);
            progressing.delete();
            progressing = null;
            message.reply(Txt2imgResultBuilder.build(locale, images))
        })
        .catch(err => {
            clearInterval(interval);
            progressing.delete();
            progressing = null;
            logger.error(err);
            interaction.editReply({
                content: locale.exceptions.unknown
            })
        })
}