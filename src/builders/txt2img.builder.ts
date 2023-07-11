import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
import Txt2imgConfirmButton from "../components/buttons/txt2imgConfirm.button.ts";
import Txt2imgSetting1Button from "../components/buttons/txt2imgSetting1.button.ts";
import Txt2imgSetting2Button from "../components/buttons/txt2imgSetting2.button.ts";
import SamplerMenu from "../components/selectMenus/sampler.menu.ts";
import txt2ImgEmbed from "../embeds/txt2img.embed.ts";
import { LocaleData } from "../i18n.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { Builder, Parameter } from "../types.js";


interface ITxt2imgBuilder extends Builder {
    build(locale: LocaleData, data?: Parameter): any
}

const defaultData: Parameter = {
    prompt: "",
    negative_prompt: "",
    sampler_index: stableDiffusion._.DefaultSampler,
    steps: stableDiffusion._.DefaultSteps,
    cfg_scale: stableDiffusion._.DefaultCFGScale,
    width: stableDiffusion._.DefaultWidth,
    height: stableDiffusion._.DefualtHeight,
    seed: stableDiffusion._.DefaultSeed,
    batch_size: stableDiffusion._.DefaultBatchSize,
    n_iter: stableDiffusion._.DefaultNIter
}

const Txt2imgBuilder: ITxt2imgBuilder = {
    name: "txt2img",
    build: (locale: LocaleData, data: Parameter=defaultData) => {
        return {
            embeds: [txt2ImgEmbed.build(locale, data)],
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>({
                    components: [
                        SamplerMenu.static[locale._key]
                    ]
                }),
                new ActionRowBuilder<ButtonBuilder>({
                    components: [
                        Txt2imgSetting1Button.static[locale._key],
                        Txt2imgSetting2Button.static[locale._key],
                    ]
                }),
                new ActionRowBuilder<ButtonBuilder>({
                	components: [
                		Txt2imgConfirmButton.static[locale._key]
                	]
                })
            ]
        }
    },
};

export default Txt2imgBuilder;