import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { checkNoParameter } from "../../utils/exception.utils.ts";
import { getParameter } from "../../utils/parameter.utils.ts";
import Txt2imgSetting2Modal from "../modals/txt2imgSetting2.modal.ts";

const Txt2imgSetting2Button: Button = {
	name: "txt2imgSetting2Button",
	build: (locale: LocaleData) => new ButtonBuilder({
		custom_id: Txt2imgSetting2Button.name,
		label: locale.txt2img_settings_2,
		style: ButtonStyle.Primary
	}),
	prebuild: true,
	onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);
        if (checkNoParameter(interaction, locale, interaction.message.embeds[0])) return;
		interaction.showModal(Txt2imgSetting2Modal.build(locale, getParameter(interaction.message.embeds[0])))
	}
}

export default Txt2imgSetting2Button;