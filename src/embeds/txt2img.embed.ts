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
                { name: locale.prompt, value: `\`\`\`\n${txt2imgData.prompt}\n\`\`\`` },
                { name: locale.negative_prompt, value: `\`\`\`\n${txt2imgData.negative_prompt}\n\`\`\`` },
                { name: locale.sampler, value: `\`\`\`\n${txt2imgData.sampler_index}\n\`\`\``, inline: true },
                { name: locale.steps, value: `\`\`\`\n${txt2imgData.steps}\n\`\`\``, inline: true },
                { name: locale.cfg_scale, value: `\`\`\`\n${txt2imgData.cfg_scale}\n\`\`\``, inline: true },
                { name: locale.size, value: `\`\`\`\n${txt2imgData.width}x${txt2imgData.height}\n\`\`\``, inline: true },
                { name: locale.batch_size, value: `\`\`\`\n${txt2imgData.batch_size}\n\`\`\``, inline: true },
                { name: locale.n_iter, value: `\`\`\`\n${txt2imgData.n_iter}\n\`\`\``, inline: true },
                { name: locale.seed, value: `\`\`\`\n${txt2imgData.seed}\n\`\`\``, inline: true },
            ],
            footer: {
                text: locale.request_modal_footer
            },
            color: 0x7289da
        })
    }
}

export default Txt2imgEmbed;