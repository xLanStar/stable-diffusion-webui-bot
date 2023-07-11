import {
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder
} from 'discord.js';
import { getCommandLocalizations } from '../../i18n.ts';
import { Command } from '../../types.js';

const InpaintProfileCommand: Command = {
    name: "inpaintProfile",
    command: new ContextMenuCommandBuilder()
        .setName("inpaintProfile")
        .setNameLocalizations(getCommandLocalizations("inpaint_profile"))
        .setType(ApplicationCommandType.User),
    onInteraction: async (interaction: ChatInputCommandInteraction) => {
        interaction.reply({ content: "尚未實作 重繪頭貼" })
    }
};

export default InpaintProfileCommand;