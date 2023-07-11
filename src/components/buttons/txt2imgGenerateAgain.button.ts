import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { getLastParameterMessage, getParameter } from "../../utils/parameter.utils.ts";
import { handleTxt2img } from "../../utils/txt2img.utils.ts";

const Txt2imgGenerateAgainButton: Button = {
    name: "txt2imgGenerateAgainButton",
    build: (locale: LocaleData) => new ButtonBuilder({
        custom_id: Txt2imgGenerateAgainButton.name,
        label: locale.generate_again,
        style: ButtonStyle.Success
    }),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);

        const sourceMessage = await getLastParameterMessage(interaction.channel.messages, interaction.message);

        if (!sourceMessage.embeds.length)
            return interaction.reply({ content: locale.exceptions.cannot_find_data });

        handleTxt2img(interaction, sourceMessage, locale, getParameter(sourceMessage.embeds[0]));
    }
}

export default Txt2imgGenerateAgainButton;