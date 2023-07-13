import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
import CloseButton from "../components/buttons/close.button.ts";
import MenuUserSettingsButton from "../components/buttons/menuUserSettings.button.ts";
import Txt2imgButton from "../components/buttons/txt2img.button.ts";
import MenuLanguageMenu from "../components/selectMenus/menuLanguage.menu.ts";
import { LocaleData } from "../i18n.ts";
import { Builder } from "../types/type.js";


interface IMenuComponentsBuilder extends Builder {
    build(locale: LocaleData): any
}

const MenuComponentsBuilder: IMenuComponentsBuilder = {
    name: "menuComponents",
    build: (locale: LocaleData) => {
        const lang = locale._key;
        return [
            new ActionRowBuilder<ButtonBuilder>({
                components: [
                    Txt2imgButton.static[lang],
                    MenuUserSettingsButton.static[lang]
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
    },
    prebuild: true
};

export default MenuComponentsBuilder;