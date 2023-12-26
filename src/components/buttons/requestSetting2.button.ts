import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { getRequestInput } from "../../utils/parameter.utils.ts";
import RequestSetting2Modal from "../modals/requestSetting2.modal.ts";

const RequestSetting2Button: Button = {
  name: "requestSetting2Button",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: RequestSetting2Button.name,
      label: locale.request_settings_2,
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
      RequestSetting2Modal.build(locale, requestInput.parameter)
    );
  },
};

export default RequestSetting2Button;
