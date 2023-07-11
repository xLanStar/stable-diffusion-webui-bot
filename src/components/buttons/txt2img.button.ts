import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import Txt2imgBuilder from "../../builders/txt2img.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";

const Txt2imgButton: Button = {
	name: "txt2imgButton",
	build: (locale: LocaleData) => new ButtonBuilder()
		.setCustomId(Txt2imgButton.name)
		.setLabel(locale.txt2img)
		.setStyle(ButtonStyle.Primary),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
		interaction.reply(Txt2imgBuilder.build(t(interaction)))
	}
}

export default Txt2imgButton;