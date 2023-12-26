import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  MessageContextMenuCommandInteraction,
} from "discord.js";
import bot from "../../bot.ts";
import { getCommandLocalizations, t } from "../../i18n.ts";
import { Command } from "../../types/type.js";

const DeleteMessageCommand: Command = {
  name: "deleteMessage",
  command: new ContextMenuCommandBuilder()
    .setName("deleteMessage")
    .setNameLocalizations(getCommandLocalizations("delete_message"))
    .setType(ApplicationCommandType.Message),
  onInteraction: async (interaction: MessageContextMenuCommandInteraction) => {
    if (
      !interaction.targetMessage.deletable ||
      interaction.targetMessage.author.id !== bot.user.id
    ) {
      interaction.reply({
        content: t(interaction).exceptions.undeletable,
        ephemeral: true,
      });
      return;
    }

    await interaction.targetMessage.delete();
    interaction.reply({ content: t(interaction).delete_success, ephemeral: true });
  },
};

export default DeleteMessageCommand;
