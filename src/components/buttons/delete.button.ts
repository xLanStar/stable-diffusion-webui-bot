import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types/type.js";
import { alertReply } from "../../utils/interaction.utils.ts";

const DeleteButton: Button = {
  name: "deleteButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: DeleteButton.name,
      label: locale.delete,
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

export default DeleteButton;
