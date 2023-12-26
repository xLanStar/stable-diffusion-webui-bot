import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { getRequestInput } from "../../utils/parameter.utils.ts";
import RequestSetting1Modal from "../modals/requestSetting1.modal.ts";

const RequestSetting1Button: Button = {
  name: "requestSetting1Button",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: RequestSetting1Button.name,
      label: locale.request_settings_1,
      style: ButtonStyle.Primary,
    }),
  prebuild: true,
  onInteraction: async (interaction: ButtonInteraction) => {
    const locale = t(interaction);

    const requestInput = await getRequestInput(
      interaction,
      locale,
      interaction.message
    );
    if (!requestInput) return;

    interaction.showModal(
      RequestSetting1Modal.build(locale, requestInput.parameter)
    );
  },
};

export default RequestSetting1Button;
