import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { alertReply } from "../../utils/interaction.utils.ts";

const CloseButton: Button = {
  name: "closeButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: CloseButton.name,
      label: locale.close,
      style: ButtonStyle.Danger,
    }),
  prebuild: true,
  onInteraction: async (interaction: ButtonInteraction) => {
    if (interaction.message.deletable) {
      interaction.message.delete();
      interaction.deferUpdate();
    } else alertReply(interaction, t(interaction).exceptions.undeletable);
  },
};

export default CloseButton;
