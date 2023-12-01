import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import RequestBuilder from "../../builders/request.builder.ts";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.ts";
import {
  getLastParameterMessage,
  getRequestInput,
} from "../../utils/parameter.utils.ts";

const Txt2imgInpaintButton: Button = {
  name: "txt2imgInpaintButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: Txt2imgInpaintButton.name,
      label: locale.inpaint,
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
      sourceMessage
    );
    if (!requestInput) return;

    requestInput.method = "img2img";

    interaction.reply(
      RequestBuilder.build(
        locale,
        interaction.user,
        requestInput,
        interaction.message.attachments.first()?.url
      )
    );
  },
};

export default Txt2imgInpaintButton;
