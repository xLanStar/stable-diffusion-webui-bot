import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData } from "../../i18n.ts";
import { Button } from "../../types.js";

const CloseButton: Button = {
	name: "closeButton",
	build: (locale: LocaleData) => new ButtonBuilder({
		custom_id: CloseButton.name,
		label: locale.close,
		style: ButtonStyle.Danger
	}),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		if (interaction.message.deletable)
			interaction.message.delete()
		interaction.deferUpdate();
	}
}

export default CloseButton;