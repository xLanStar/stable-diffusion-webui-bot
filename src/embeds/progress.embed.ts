import { APIEmbed, EmbedBuilder, User } from "discord.js";
import { LocaleData } from "../i18n.ts";
import logger from "../logger.ts";
import { Methods } from "../types/enums.ts";
import { Embed, Progress } from "../types/type.js";
import { formatTime } from "../utils/date.utils.ts";

const { PROGRESS_LENGTH, PROGRESS_INTERVAL } = process.env;

const progressLength = Number(PROGRESS_LENGTH) || 22;
if (!Number(PROGRESS_LENGTH))
    logger.warn("Progress length is empty. It has been set to default(22)");

interface IProgressEmbed extends Embed {
    build(locale: LocaleData, user: User): EmbedBuilder
    update(embed: APIEmbed, locale: LocaleData, progress: Progress): EmbedBuilder
}

const ProgressEmbed: IProgressEmbed = {
    name: "progress",
    build: (locale: LocaleData, user: User): EmbedBuilder =>
        new EmbedBuilder({
            author: {
                iconURL: user.avatarURL(),
                name: Methods.txt2img
            },
            image: {
                url: 'attachment://preview.png'
            },
            title: locale.progress,
            description: locale.preparing,
            color: 0x7289da
        }),
    update: (embed: APIEmbed, locale: LocaleData, progress?: Progress): EmbedBuilder => {
        const num = Math.floor(progress.progress * progressLength)
        const almostDone = progress.progress >= 1;

        return new EmbedBuilder(embed)
            .setDescription(almostDone
                ? locale.almost_done
                : `[${'█'.repeat(num)}${'░'.repeat(progressLength - num)}]`)
            .setFields(almostDone
                ? []
                : [
                    { name: locale.batch, value: (progress.state.job_no + 1).toString(), inline: true },
                    { name: locale.progress, value: `${Math.floor(progress.progress * 100)}%`, inline: true },
                    { name: locale.eta, value: formatTime(progress.eta_relative), inline: true },
                ])
            .setImage('attachment://preview.png')
    }
}

export default ProgressEmbed;