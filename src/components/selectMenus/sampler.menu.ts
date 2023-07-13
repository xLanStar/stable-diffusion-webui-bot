import { StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import RequestEmbed from "../../embeds/request.embed.ts";
import { LocaleData, t } from "../../i18n.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Menu, Sampler } from "../../types/type.js";
import { getRequestInput } from "../../utils/parameter.utils.ts";


const SamplerMenu: Menu = {
	name: "samplerMenu",
	build: (locale: LocaleData) => {
		return new StringSelectMenuBuilder({
			custom_id: SamplerMenu.name,
			placeholder: locale.sampler,
			options: stableDiffusion.samplers.map((sampler: Sampler) => {
				return {
					label: sampler.name,
					value: sampler.name
				}
			})
		})
	},
	prebuild: true,
	onInteraction: async (interaction: StringSelectMenuInteraction) => {
		const locale = t(interaction);
		const requestInput = await getRequestInput(interaction, locale, interaction.message);
		if (!requestInput) return;
		interaction.update({ embeds: [RequestEmbed.update(interaction.message.embeds[0], locale, requestInput.parameter)] })
	}
}

export default SamplerMenu;