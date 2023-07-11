import { ButtonBuilder, ButtonInteraction, ButtonStyle } from "discord.js";
import { LocaleData, t } from "../../i18n.ts";
import { Button } from "../../types.js";

const Txt2imgInpaintButton: Button = {
    name: "txt2imgInpaintButton",
    build: (locale: LocaleData) => new ButtonBuilder({
        custom_id: Txt2imgInpaintButton.name,
        label: locale.inpaint,
        style: ButtonStyle.Primary
    }),
    prebuild: true,
    onInteraction: async (interaction: ButtonInteraction) => {
        const locale = t(interaction);
        interaction.reply({ content: "尚未實作 重繪圖片" });
    }
}

export default Txt2imgInpaintButton;