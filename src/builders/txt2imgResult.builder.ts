import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder } from "discord.js";
import Txt2imgAdjustButton from "../components/buttons/txt2imgAdjust.button.ts";
import Txt2imgGenerateAgainButton from "../components/buttons/txt2imgGenerateAgain.button.ts";
import Txt2imgInpaintButton from "../components/buttons/txt2imgInpaint.button.ts";
import { LocaleData } from "../i18n.ts";
import { Builder } from "../types.js";


interface ITxt2imgResultBuilder extends Builder {
    build(locale: LocaleData, images: string[]): any
}

const Txt2imgResultBuilder: ITxt2imgResultBuilder = {
    name: "txt2img",
    build: (locale: LocaleData, images: string[]) => {
        return {
            files: images.map(image => new AttachmentBuilder(Buffer.from(image, 'base64'))),
            components: [
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        Txt2imgGenerateAgainButton.static[locale._key],
                        Txt2imgInpaintButton.static[locale._key],
                        Txt2imgAdjustButton.static[locale._key]
                    ]
                })
            ]
        }
    }
};

export default Txt2imgResultBuilder;