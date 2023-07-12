import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData } from "../../i18n.ts";
import { Button } from "../../types.js";

const CloseButton: Button = {
	name: "closeButton",
	build: (locale: LocaleData) => new ButtonBuilder()
		.setCustomId(CloseButton.name)
		.setLabel(locale.close)
		.setStyle(ButtonStyle.Danger),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		if (interaction.message.deletable)
			interaction.message.delete()
		interaction.deferUpdate();
	}
}

export default CloseButton;