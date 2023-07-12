import { EmbedBuilder } from "discord.js";
import { LocaleData } from "../i18n.ts";
import logger from "../logger.ts";
import { Embed, Progress } from "../types.js";
import { formatTime } from "../utils/date.utils.ts";

const { PROGRESS_LENGTH, PROGRESS_INTERVAL } = process.env;

const progressLength = Number(PROGRESS_LENGTH) || 22;
if (!Number(PROGRESS_LENGTH))
    logger.warn("Progress length is empty. It has been set to default(22)");

interface IProgressEmbed extends Embed {
    build(locale: LocaleData): EmbedBuilder
    update(locale: LocaleData, progress: Progress): EmbedBuilder
}

const ProgressEmbed: IProgressEmbed = {
    name: "progress",
    build: function (locale: LocaleData): EmbedBuilder {
        return new EmbedBuilder({
            title: locale.progress,
            description: locale.preparing,
            color: 0x7289da
        })
    },
    prebuild: true,
    update: function (locale: LocaleData, progress?: Progress): EmbedBuilder {
        const num = Math.floor(progress.progress * progressLength)
        const almostDone = progress.progress >= 1;
        return new EmbedBuilder({
            title: locale.progress,
            description: almostDone
                ? locale.almost_done
                : `[${'█'.repeat(num)}${'░'.repeat(progressLength - num)}]`,
            fields: almostDone
                ? []
                : [
                    { name: locale.batch, value: (progress.state.job_no + 1).toString(), inline: true },
                    { name: locale.progress, value: `${Math.floor(progress.progress * 100)}%`, inline: true },
                    { name: locale.eta, value: formatTime(progress.eta_relative), inline: true },
                ],
            image: { url: "attachment://preview.png" },
            color: 0x7289da
        })
    },
}

export default ProgressEmbed;