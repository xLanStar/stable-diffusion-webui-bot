import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import MenuBuilder from "../../builders/menu.builder.ts";
import { getCommandLocalizations, getLocalizations, t } from "../../i18n.ts";
import { Command } from "../../types/type.js";

const MenuCommand: Command = {
  name: "menu",
  command: new SlashCommandBuilder()
    .setName("menu")
    .setNameLocalizations(getCommandLocalizations("home"))
    .setDescription("Main Menu")
    .setDescriptionLocalizations(getLocalizations("home")),
  onInteraction: async (interaction: ChatInputCommandInteraction) =>
    interaction.reply(MenuBuilder.build(t(interaction), interaction.user)),
};

export default MenuCommand;
