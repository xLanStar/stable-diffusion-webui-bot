import {
    ModalBuilder,
    ModalSubmitInteraction
} from "discord.js";
import { LocaleData } from "../../i18n.ts";
import { Modal } from "../../types.ts";

const UserSettingsModal: Modal = {
    name: "userSettingsModal",
    build: (locale: LocaleData) => {
        const modal = new ModalBuilder({
            custom_id: UserSettingsModal.name,
            title: locale.txt2img
        })

        return modal;
    },
    onInteraction: async (interaction: ModalSubmitInteraction) => {
        interaction.reply({
            content: "尚未實作"
        })
    }
}

export default UserSettingsModal;