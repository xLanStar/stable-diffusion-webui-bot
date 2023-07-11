import { Interaction } from "discord.js";
import bot from "../../bot.ts";
import logger from "../../logger.ts";
import { IInteractable } from "../../types.js";

const { commands, components, builders } = bot;

export const handleBuilder = (interaction: Interaction) => {

}

export const processCustomId = (customId: string): [string, string] =>
    customId[0] === '!'
        ? [customId.substring(1, customId.lastIndexOf("_")), customId.substring(customId.lastIndexOf("_") + 1)]
        : ['', customId]

export default {
    name: 'interactionCreate',
    execute: async (interaction: Interaction) => {
        // Commands
        if (interaction.isChatInputCommand()
            || interaction.isMessageContextMenuCommand()
            || interaction.isContextMenuCommand()) {
            const { commandName } = interaction;
            const command = commands.get(commandName) as IInteractable;
            if (!command) {
                logger.error(`[事件] interactionCreate 找不到 "${command}" 指令`)
                return interaction.reply({
                    content: `發生錯誤...`,
                    ephemeral: true
                });
            }

            try {
                logger.info(`[事件] onInteraction ${command.name}`)
                await command.onInteraction(interaction);
            } catch (err) {
                logger.error(err);
                await interaction.reply({
                    content: `發生錯誤...`,
                    ephemeral: true
                })
            }
        }
        if (interaction.isButton()
            || interaction.isAnySelectMenu()
            || interaction.isModalSubmit()) {
            // customId format:
            // [!<builderName>.<functionName>.<...builderArgs>]
            const { customId  } = interaction;
            // Builder
            if (customId[0] === '!') {
                logger.info(customId.substring(1));
                const [builderName, functionName, ...builderArgs] = customId.substring(1).split(".");
                const builder = builders.get(builderName);
                if (!builder) {
                    logger.error(`[事件] interactionCreate 找不到 "${builderName}" Builder`)
                    return interaction.reply({
                        content: `發生錯誤...`,
                        ephemeral: true
                    });
                }
                builder[functionName](interaction, ...builderArgs);
                return;
            }
            
            const [componentName, ...args] = customId.split(".");
            const component = components.get(componentName);
            if (!component) {
                logger.error(`[事件] interactionCreate 找不到 "${componentName}" Modal`)
                return interaction.reply({
                    content: `發生錯誤...`,
                    ephemeral: true
                });
            }

            try {
                logger.info(`[事件] onInteraction ${componentName}`)
                await component.onInteraction(interaction, ...args);
            } catch (err) {
                logger.error(err);
                await interaction.reply({
                    content: `發生錯誤...`,
                    ephemeral: true
                })
            }
        }
    }
}