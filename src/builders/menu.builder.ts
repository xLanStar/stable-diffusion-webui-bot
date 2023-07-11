import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import MenuUserSettingsButton from "../components/buttons/menuUserSettings.button.ts";
import Txt2imgButton from "../components/buttons/txt2img.button.ts";
import MenuLanguageMenu from "../components/selectMenus/menuLanguage.menu.ts";
import { LocaleData } from "../i18n.ts";
import { FILE_URL } from "../reference.ts";
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
        return {
            embeds: [
                new EmbedBuilder({
                    title: locale.bot,
                    fields: [
                        { name: locale.model, value: stableDiffusion.currentModel.title }
                    ],
                    image: {
                        url: `${stableDiffusion.helper.defaults.baseURL}${FILE_URL(stableDiffusion.currentModel.model_name)}`
                    }
                })
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        Txt2imgButton.static[locale._key],
                        MenuUserSettingsButton.static[locale._key]
                    ]
                }),
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        new ButtonBuilder()
                            .setCustomId(`!${MenuBuilder.name}.${MenuBuilder.previousModel.name}`)
                            .setLabel(locale.previousModel)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId(`!${MenuBuilder.name}.${MenuBuilder.nextModel.name}`)
                            .setLabel(locale.nextModel)
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        MenuLanguageMenu.static[locale._key]
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