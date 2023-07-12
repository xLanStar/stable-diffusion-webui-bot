import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData } from "../../i18n.ts";
import { Button } from "../../types.js";

const DeleteButton: Button = {
	name: "deleteButton",
	build: (locale: LocaleData) => new ButtonBuilder()
		.setCustomId(DeleteButton.name)
		.setLabel(locale.delete)
		.setStyle(ButtonStyle.Danger),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		if (interaction.message.deletable)
			interaction.message.delete()
		interaction.deferUpdate();
	}
}

export default DeleteButton;