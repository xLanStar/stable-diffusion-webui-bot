import { InteractionResponse, Message, RepliableInteraction } from "discord.js";

export const alertReply = (interaction: RepliableInteraction, content: string) => interaction.reply({ content, ephemeral: true }).then(deferDeleteResponse);
export const deferDeleteReply = (interaction: RepliableInteraction) => setTimeout(() => interaction.deleteReply(), 5000);
export const deferDeleteResponse = (response: InteractionResponse) => setTimeout(() => response.delete(), 5000);
export const deferDeleteMessage = (message: Message) => message.deletable && setTimeout(() => message.delete(), 5000);