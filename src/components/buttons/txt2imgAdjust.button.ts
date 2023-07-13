import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import Txt2imgBuilder from "../../builders/txt2img.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { checkNoParameter } from "../../utils/exception.utils.ts";
import { getLastParameterMessage, getParameter } from "../../utils/parameter.utils.ts";

const Txt2imgAdjustButton: Button = {
    name: "txt2imgAdjustButton",
    build: (locale: LocaleData) => new ButtonBuilder({
        custom_id: Txt2imgAdjustButton.name,
        label: locale.adjust,
        style: ButtonStyle.Primary
    }),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);

        const sourceMessage = await getLastParameterMessage(interaction.channel.messages, interaction.message);

        if (checkNoParameter(interaction, locale, sourceMessage.embeds[0])) return;

        const data = getParameter(sourceMessage.embeds[0]);

        interaction.reply(Txt2imgBuilder.build(locale, interaction.user, data));
    }
}

export default Txt2imgAdjustButton;