import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import Txt2imgBuilder from "../../builders/txt2img.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";

const Txt2imgButton: Button = {
	name: "txt2imgButton",
	build: (locale: LocaleData) => new ButtonBuilder({
		custom_id: Txt2imgButton.name,
		label: locale.txt2img,
		style: ButtonStyle.Primary
	}),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		if (interaction.message.attachments.size)
			await interaction.message.removeAttachments();
		interaction.update(Txt2imgBuilder.build(t(interaction), interaction.user))
	}
}

export default Txt2imgButton;