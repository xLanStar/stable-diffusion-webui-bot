import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { handleRequest } from "../../utils/generate.utils.ts";
import { getLastParameterMessage, getParameter } from "../../utils/parameter.utils.ts";

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

        await interaction.deferUpdate();
        handleRequest({
            method: "txt2img",
            message: sourceMessage,
            locale,
            data: getParameter(sourceMessage.embeds[0])
        });
    }
}

export default Txt2imgGenerateAgainButton;