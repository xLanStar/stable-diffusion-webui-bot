import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { getCommandLocalizations } from "../../i18n.ts";
import { Command } from "../../types/type.js";

const InpaintProfileCommand: Command = {
  name: "inpaintProfile",
  command: new ContextMenuCommandBuilder()
    .setName("inpaintProfile")
    .setNameLocalizations(getCommandLocalizations("inpaint_profile"))
    .setType(ApplicationCommandType.User),
  onInteraction: async (interaction: UserContextMenuCommandInteraction) => {
    interaction.reply({ content: "尚未實作 重繪頭貼" });
  },
};

export default InpaintProfileCommand;
