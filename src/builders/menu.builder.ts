import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import CloseButton from "../components/buttons/close.button.ts";
import MenuUserSettingsButton from "../components/buttons/menuUserSettings.button.ts";
import Txt2imgButton from "../components/buttons/txt2img.button.ts";
import MenuLanguageMenu from "../components/selectMenus/menuLanguage.menu.ts";
import { LocaleData } from "../i18n.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { Builder } from "../types.js";


interface IMenuBuilder extends Builder {
    build(locale: LocaleData): any
    previousModel(interaction: ButtonInteraction): void
    nextModel(interaction: ButtonInteraction): void
}

const MenuBuilder: IMenuBuilder = {
    name: "menu",
    build: (locale: LocaleData) => {
        const lang = locale._key;
        return {
            embeds: [
                new EmbedBuilder({
                    title: locale.bot,
                    fields: [
                        { name: locale.model, value: stableDiffusion.currentModel.title }
                    ],
                    image: {
                        url: `attachment://preview.png`
                    }
                })
            ],
            files: [new AttachmentBuilder(stableDiffusion.currentModelPreview, { name: 'preview.png' })],
            components: [
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        Txt2imgButton.static[lang],
                        MenuUserSettingsButton.static[lang]
                    ]
                }),
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        new ButtonBuilder({
                            custom_id: `!${MenuBuilder.name}.${MenuBuilder.previousModel.name}`,
                            label: locale.previousModel,
                            style: ButtonStyle.Primary
                        }),
                        new ButtonBuilder({
                            custom_id: `!${MenuBuilder.name}.${MenuBuilder.nextModel.name}`,
                            label: locale.nextModel,
                            style: ButtonStyle.Primary
                        })
                    ]
                }),
                new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        MenuLanguageMenu.static[lang]
                    ]
                }),
                new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        CloseButton.static[lang]
                    ]
                })
            ]
        }
    },
    previousModel: async (interaction: ButtonInteraction) => {
        interaction.reply({ content: "尚未實作previousModel" })
    },
    nextModel: async (interaction: ButtonInteraction) => {
        interaction.reply({ content: "尚未實作nextModel" })
    }
};

export default MenuBuilder;