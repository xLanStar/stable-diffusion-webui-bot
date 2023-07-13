import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { checkEmpty, checkNoParameter } from "../../utils/exception.utils.ts";
import { handleRequest } from "../../utils/generate.utils.ts";
import { getParameter } from "../../utils/parameter.utils.ts";

const Txt2imgConfirmButton: Button = {
    name: "txt2imgConfirmButton",
    build: (locale: LocaleData) => new ButtonBuilder({
		custom_id: Txt2imgConfirmButton.name,
		label: locale.generate,
		style: ButtonStyle.Success
	}),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);
        if (checkNoParameter(interaction, locale, interaction.message.embeds[0])) return;
        const data = getParameter(interaction.message.embeds[0]);
        if (checkEmpty(interaction, locale, locale.prompt, data.prompt)) return;

        await interaction.deferUpdate();
        handleRequest({
            method: "txt2img",
            message: interaction.message,
            locale,
            data
        });
    }
}

export default Txt2imgConfirmButton;