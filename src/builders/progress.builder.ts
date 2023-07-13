import { APIEmbed, AttachmentBuilder, User } from "discord.js";
import ProgressEmbed from "../embeds/progress.embed.ts";
import { LocaleData } from "../i18n.ts";
import logger from "../logger.ts";
import { Builder, Progress } from "../types/type.js";


interface IProgressBuilder extends Builder {
    build(locale: LocaleData, user: User): any
    update(embed: APIEmbed, locale: LocaleData, progress: Progress, updateFiles: boolean): any
}

const ProgressBuilder: IProgressBuilder = {
    name: "progress",
    build: (locale: LocaleData, user: User) => {
        return {
            embeds: [ProgressEmbed.build(locale, user)],
            components: [
                // TODO: interrupt
            ]
        }
    },
    update: (embed: APIEmbed, locale: LocaleData, progress: Progress, updateFiles: boolean) => {
        const result = {
            embeds: [ProgressEmbed.update(embed, locale, progress)]
        } as any;
        if (updateFiles && progress.current_image) {
            result.files = [
                new AttachmentBuilder(Buffer.from(progress.current_image, "base64"), { name: "preview.png" })
            ]
        }
        return result;
    },
};

export default ProgressBuilder;