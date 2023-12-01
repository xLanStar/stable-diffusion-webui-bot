import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData } from "../../i18n.ts";
import { Button } from "../../types/type.js";

const MenuUserSettingsButton: Button = {
  name: "menuUserSettingsButton",
  build: (locale: LocaleData) =>
    new ButtonBuilder({
      custom_id: MenuUserSettingsButton.name,
      label: locale.user_settings,
      style: ButtonStyle.Primary,
    }),
  prebuild: true,
  onInteraction: async (interaction: ButtonInteraction) => {
    interaction.reply({ content: "尚未實作 user settings" });
    // interaction.showModal(UserSettingsModal.build(t(interaction)))
  },
};

export default MenuUserSettingsButton;
