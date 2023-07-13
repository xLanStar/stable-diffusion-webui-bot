import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import RequestBuilder from "../../builders/request.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { getLastParameterMessage, getRequestInput } from "../../utils/parameter.utils.ts";

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

        const requestInput = await getRequestInput(interaction, locale, sourceMessage);
        if (!requestInput) return;

        interaction.reply(RequestBuilder.build(locale, interaction.user, requestInput));
    }
}

export default Txt2imgAdjustButton;