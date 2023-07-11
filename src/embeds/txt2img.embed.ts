import { EmbedBuilder } from "discord.js";
import { LocaleData } from "../i18n.ts";
import { Embed, Parameter } from "../types.js";


interface ITxt2imgEmbed extends Embed {
    build(locale: LocaleData, txt2imgData: Parameter): EmbedBuilder
}

const Txt2imgEmbed: ITxt2imgEmbed = {
    name: "txt2img",
    build: function (locale: LocaleData, txt2imgData: Parameter): EmbedBuilder {
        return new EmbedBuilder({
            title: locale.txt2img_parameters,
            fields: [
                { name: locale.prompt, value: txt2imgData.prompt },
                { name: locale.negative_prompt, value: txt2imgData.negative_prompt },
                { name: locale.sampler, value: txt2imgData.sampler_index, inline: true },
                { name: locale.steps, value: txt2imgData.steps.toString(), inline: true },
                { name: locale.cfg_scale, value: txt2imgData.cfg_scale.toString(), inline: true },
                { name: locale.width, value: txt2imgData.width.toString(), inline: true },
                { name: locale.height, value: txt2imgData.height.toString(), inline: true },
                { name: locale.seed, value: txt2imgData.seed.toString(), inline: true },
                { name: locale.batch_size, value: txt2imgData.batch_size.toString(), inline: true },
                { name: locale.n_iter, value: txt2imgData.n_iter.toString(), inline: true },
            ],
            footer: {
                text: "注意！若刪除此嵌入內容，將會導致無法再次生成圖片。"
            },
            color: 0x7289da
        })
    }
}

export default Txt2imgEmbed;