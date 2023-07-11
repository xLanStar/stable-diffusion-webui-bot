import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { checkEmpty } from "../../utils/assert.utils.ts";
import { getParameter } from "../../utils/parameter.utils.ts";
import { handleTxt2img } from "../../utils/txt2img.utils.ts";

const Txt2imgConfirmButton: Button = {
    name: "txt2imgConfirmButton",
    build: (locale: LocaleData) => new ButtonBuilder()
        .setCustomId(Txt2imgConfirmButton.name)
        .setLabel(locale.generate)
        .setStyle(ButtonStyle.Success),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);
        const data = getParameter(interaction.message.embeds[0]);
        if (checkEmpty(interaction, locale, locale.prompt, data.prompt)) return;

        handleTxt2img(interaction, interaction.message, locale, data);
    }
}

export default Txt2imgConfirmButton;