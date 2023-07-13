import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";
import { checkNoParameter } from "../../utils/exception.utils.ts";
import { getLastParameterMessage } from "../../utils/parameter.utils.ts";

const Txt2imgInpaintButton: Button = {
    name: "txt2imgInpaintButton",
    build: (locale: LocaleData) => new ButtonBuilder({
        custom_id: Txt2imgInpaintButton.name,
        label: locale.inpaint,
        style: ButtonStyle.Success
    }),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);

        const sourceMessage = await getLastParameterMessage(interaction.channel.messages, interaction.message);

        if (checkNoParameter(interaction, locale, sourceMessage.embeds[0])) return;
        
        return interaction.reply({ content: "尚未實作 重繪圖片" });
        
        if (!sourceMessage.embeds.length)
            return interaction.reply({ content: locale.exceptions.no_parameters });
    }
}

export default Txt2imgInpaintButton;