import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { handleRequest } from "../../utils/generate.utils.ts";
import {
  getLastParameterMessage,
  getRequestInput,
} from "../../utils/parameter.utils.ts";

const RequestGenerateAgainButton: Button = {
  name: "requestGenerateAgainButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: RequestGenerateAgainButton.name,
      label: locale.generate_again,
      style: ButtonStyle.Success,
    }),
  prebuild: true,
  onInteraction: async (interaction: ButtonInteraction) => {
    const locale = t(interaction);

    const sourceMessage = await getLastParameterMessage(
      interaction.channel.messages,
      interaction.message
    );

    const requestInput = await getRequestInput(
      interaction,
      locale,
      sourceMessage,
      true
    );
    if (!requestInput) return;

    await interaction.deferUpdate();
    handleRequest({
      ...requestInput,
      user: interaction.user,
      parameterMessage: sourceMessage,
      locale,
    });
  },
};

export default RequestGenerateAgainButton;
