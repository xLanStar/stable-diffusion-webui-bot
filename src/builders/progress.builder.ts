import { AttachmentBuilder } from "discord.js";
import ProgressEmbed from "../embeds/progress.embed.ts";
import { LocaleData } from "../i18n.ts";
import { Builder, Progress } from "../types.js";


interface IProgressBuilder extends Builder {
    build(locale: LocaleData): any
    update(locale: LocaleData, progress: Progress, updateFiles: boolean): any
}

const ProgressBuilder: IProgressBuilder = {
    name: "progress",
    build: (locale: LocaleData) => {
        return {
            embeds: [ProgressEmbed.static[locale._key]],
            components: [
                // TODO: interrupt
            ],
            content: ''
        }
    },
    update: (locale: LocaleData, progress: Progress, updateFiles: boolean) => {
        const result = {
            embeds: [ProgressEmbed.update(locale, progress)]
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