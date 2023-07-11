import { LocaleString, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { LocaleData, changeLanguage, i18n, t } from "../../i18n.ts";
import { Menu } from "../../types.js";
import MenuBuilder from "../../builders/menu.builder.ts";

const MenuLanguageMenu: Menu = {
	name: "languageMenu",
	build: (locale: LocaleData) => new StringSelectMenuBuilder({
		custom_id: MenuLanguageMenu.name,
		placeholder: locale._name,
		options: Object.keys(i18n).map((lang: LocaleString) => {
			return {
				label: i18n[lang]._name,
				value: lang
			}
		})
	}),
	prebuild: true,
	onInteraction: async (interaction: StringSelectMenuInteraction) => {
		changeLanguage(interaction.channelId, interaction.values[0] as LocaleString)
		await interaction.update(MenuBuilder.build(t(interaction)));
	}
}

export default MenuLanguageMenu;