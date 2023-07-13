import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import MenuBuilder from "../../builders/menu.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";

const HomeButton: Button = {
	name: "homeButton",
	build: (locale: LocaleData) => new ButtonBuilder({
		custom_id: HomeButton.name,
		label: locale.home,
		style: ButtonStyle.Primary
	}),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		interaction.message.removeAttachments();
		interaction.update(MenuBuilder.build(t(interaction)));
	}
}

export default HomeButton;