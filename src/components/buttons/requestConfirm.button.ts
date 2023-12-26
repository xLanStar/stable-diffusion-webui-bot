import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { checkEmpty } from "../../utils/exception.utils.ts";
import { handleRequest } from "../../utils/generate.utils.ts";
import { getRequestInput } from "../../utils/parameter.utils.ts";

const RequestConfirmButton: Button = {
  name: "requestConfirmButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: RequestConfirmButton.name,
      label: locale.generate,
      style: ButtonStyle.Success,
    }),
  prebuild: true,
  onInteraction: async (interaction: ButtonInteraction) => {
    const locale = t(interaction);

    const requestInput = await getRequestInput(
      interaction,
      locale,
      interaction.message,
      true
    );
    if (!requestInput) return;

    if (
      checkEmpty(
        interaction,
        locale,
        locale.prompt,
        requestInput.parameter.prompt
      )
    )
      return;

    await interaction.deferUpdate();
    handleRequest({
      ...requestInput,
      user: interaction.user,
      parameterMessage: interaction.message,
      locale,
    });
  },
};

export default RequestConfirmButton;
