import { LocaleString, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import MenuBuilder from "../../builders/menu.builder.ts";
import { LocaleData, changeLocale, i18n } from "../../i18n.ts";
import { Menu } from "../../types/type.js";
import { alertReply } from "../../utils/interaction.utils.ts";

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
		const locale = changeLocale(interaction.channelId, interaction.values[0] as LocaleString)
		const embed = interaction.message.embeds[0];
		if (!embed)
			return alertReply(interaction, locale.exceptions.no_parameters);
		await interaction.update(MenuBuilder.update(embed, locale));
	}
}

export default MenuLanguageMenu;