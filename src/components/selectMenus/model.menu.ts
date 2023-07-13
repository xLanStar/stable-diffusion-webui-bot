import { StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { LocaleData } from "../../i18n.ts";
import logger from "../../logger.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Menu } from "../../types/type.js";

const ModelMenu: Menu = {
	name: "modelMenu",
	build: (locale: LocaleData, builderName?: string) => {
		return new StringSelectMenuBuilder({
			custom_id: builderName ? `!${builderName}_${ModelMenu.name}` : ModelMenu.name,
			placeholder: stableDiffusion.models[Object.keys(stableDiffusion.models)[0]].title,
			options: Object.keys(stableDiffusion.models).map((model_name: string) => {
				return {
					label: stableDiffusion.models[model_name].title,
					value: model_name
				}
			})
		})
	},
	prebuild: true,
	onInteraction: async (interaction: StringSelectMenuInteraction) => {
		logger.info(`you select ${interaction.values} for ${interaction.guild} ${interaction.guildId}`)
		await interaction.reply({
			content: `You select ${interaction.values}`,
		});
	}
}

export default ModelMenu;