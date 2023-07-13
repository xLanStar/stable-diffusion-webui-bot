import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import RequestBuilder from "../../builders/request.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { defaultTxt2imgParameter } from "../../stable_diffusion.ts";
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
		interaction.update(RequestBuilder.build(t(interaction), interaction.user, { method: "txt2img", parameter: defaultTxt2imgParameter }))
	}
}

export default Txt2imgButton;