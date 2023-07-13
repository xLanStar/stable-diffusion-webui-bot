import { APIEmbed, AttachmentBuilder, EmbedBuilder, User } from "discord.js";
import { LocaleData } from "../i18n.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { Builder } from "../types/type.js";
import MenuComponentsBuilder from "./menu.component.builder.ts";


interface IMenuBuilder extends Builder {
    build(locale: LocaleData, user: User): any
    update(embed: APIEmbed, locale: LocaleData): any
}

const MenuBuilder: IMenuBuilder = {
    name: "menu",
    build: (locale: LocaleData, user: User) => {
        return {
            embeds: [
                new EmbedBuilder({
                    author: {
                        iconURL: user.avatarURL(),
                        name: user.username
                    },
                    title: locale.bot,
                    fields: [
                        { name: locale.model, value: stableDiffusion.currentModel.title }
                    ],
                    image: {
                        url: `attachment://preview.png`
                    },

                })
            ],
            files: [new AttachmentBuilder(stableDiffusion.currentModelPreview, { name: "preview.png" })],
            components: MenuComponentsBuilder.static[locale._key]
        }
    },
    update: (embed: APIEmbed, locale: LocaleData) => {
        return {
            embeds: [
                new EmbedBuilder(embed)
                    .setTitle(locale.bot)
                    .setFields({ name: locale.model, value: stableDiffusion.currentModel.title })
            ],
            components: MenuComponentsBuilder.static[locale._key]
        }
    }
};

export default MenuBuilder;