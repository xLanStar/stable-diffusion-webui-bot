import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  MessageContextMenuCommandInteraction,
} from "discord.js";
import { getCommandLocalizations, t } from "../../i18n.ts";
import { Command } from "../../types/type.js";
import bot from "../../bot.ts";

const DeleteMessageCommand: Command = {
  name: "deleteMessage",
  command: new ContextMenuCommandBuilder()
    .setName("deleteMessage")
    .setNameLocalizations(getCommandLocalizations("delete_message"))
    .setType(ApplicationCommandType.Message),
  onInteraction: async (interaction: MessageContextMenuCommandInteraction) => {
    if (!interaction.targetMessage.deletable || interaction.targetMessage.author.id !== bot.user.id) {
      interaction.reply({
        content: t(interaction).exceptions.undeletable,
        ephemeral: true,
      });
      return;
    }

    await interaction.targetMessage.delete();
  },
};

export default DeleteMessageCommand;
