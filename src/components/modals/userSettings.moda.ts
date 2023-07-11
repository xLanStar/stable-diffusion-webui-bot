import {
    ActionRowBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import { LocaleData, f } from "../../i18n.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Modal } from "../../types.ts";

const UserSettingsModal: Modal = {
    name: "userSettingsModal",
    build: (locale: LocaleData) => {
        const modal = new ModalBuilder()
            .setCustomId(UserSettingsModal.name)
            .setTitle(locale.txt2img)

        modal.addComponents(
            // new ActionRowBuilder({ components: [widthText] }),
        );

        return modal;
    },
    onInteraction: async (interaction: ModalSubmitInteraction) => {
        interaction.reply({
            content: "尚未實作"
        })
    }
}

export default UserSettingsModal;