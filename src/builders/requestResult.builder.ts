import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, User } from "discord.js";
import DeleteButton from "../components/buttons/delete.button.ts";
import Txt2imgAdjustButton from "../components/buttons/txt2imgAdjust.button.ts";
import Txt2imgGenerateAgainButton from "../components/buttons/txt2imgGenerateAgain.button.ts";
import Txt2imgInpaintButton from "../components/buttons/txt2imgInpaint.button.ts";
import { LocaleData, f } from "../i18n.ts";
import { Builder } from "../types/type.js";


interface IRequestResultBuilder extends Builder {
    build(locale: LocaleData, user: User, images: string[]): any
}

const RequestResultBuilder: IRequestResultBuilder = {
    name: "requestResult",
    build: (locale: LocaleData, user: User, images: string[]) => {
        const lang = locale._key;
        return {
            files: images.map(image => new AttachmentBuilder(Buffer.from(image, 'base64'))),
            components: [
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        Txt2imgGenerateAgainButton.static[lang],
                        Txt2imgInpaintButton.static[lang],
                        Txt2imgAdjustButton.static[lang],
                        DeleteButton.static[lang]
                    ]
                })
            ],
            embeds: [],
            content: f(locale.done, { user: `<@${user.id}>` })
        }
    }
};

export default RequestResultBuilder;