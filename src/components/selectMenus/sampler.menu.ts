import { StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import Txt2imgEmbed from "../../embeds/txt2img.embed.ts";
import { LocaleData, t } from "../../i18n.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Menu, Sampler } from "../../types.js";
import { getParameter } from "../../utils/parameter.utils.ts";


const SamplerMenu: Menu = {
	name: "samplerMenu",
	build: (locale: LocaleData) => {
		return new StringSelectMenuBuilder()
			.setCustomId(SamplerMenu.name)
			.setPlaceholder(locale.sampler)
			.setOptions(stableDiffusion.samplers.map((sampler: Sampler) => {
				return {
					label: sampler.name,
					value: sampler.name
				}
			}))
	},
    prebuild: true,
	onInteraction: async (interaction: StringSelectMenuInteraction) => {
		const data = getParameter(interaction.message.embeds[0]);
		data.sampler_index = interaction.values[0];
        interaction.update({ embeds: [Txt2imgEmbed.build(t(interaction), data)] })
	}
}

export default SamplerMenu;