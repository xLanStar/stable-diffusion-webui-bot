import { AttachmentBuilder } from "discord.js";
import ProgressEmbed from "../embeds/progress.embed.ts";
import { LocaleData } from "../i18n.ts";
import { Builder, Progress } from "../types.js";


interface IProgressBuilder extends Builder {
    build(locale: LocaleData, progress: Progress): any
}

const ProgressBuilder: IProgressBuilder = {
    name: "progress",
    build: (locale: LocaleData, progress: Progress) => {
        const result = {
            embeds: [ProgressEmbed.build(locale, progress)],
            files: [],
            components: [
                // TODO: interrupt
            ]
        }
        if (progress.current_image)
            result.files = [
                new AttachmentBuilder(Buffer.from(progress.current_image, "base64"), { name: "preview.png" })
            ]
        return result;
    },
};

export default ProgressBuilder;