import { APIEmbed, EmbedBuilder, User } from "discord.js";
import { LocaleData } from "../i18n.ts";
import { Methods } from "../types/enums.ts";
import { Embed, Parameter } from "../types/type.js";


interface ITxt2imgEmbed extends Embed {
    build(locale: LocaleData, user: User, data: Parameter): EmbedBuilder
    update(embed: APIEmbed, locale: LocaleData, data: Parameter): EmbedBuilder;
}

const Txt2imgEmbed: ITxt2imgEmbed = {
    name: "txt2img",
    build: (locale: LocaleData, user: User, data: Parameter): EmbedBuilder =>
        new EmbedBuilder({
            author: {
                iconURL: user.avatarURL(),
                name: Methods.txt2img
            },
            title: locale.txt2img_parameters,
            fields: [
                { name: locale.prompt, value: `\`\`\`${data.prompt || ' '}\`\`\`` },
                { name: locale.negative_prompt, value: `\`\`\`${data.negative_prompt || ' '}\`\`\`` },
                { name: locale.sampler, value: `\`\`\`${data.sampler_index || ' '}\`\`\``, inline: true },
                { name: locale.steps, value: `\`\`\`${data.steps}\`\`\``, inline: true },
                { name: locale.cfg_scale, value: `\`\`\`${data.cfg_scale}\`\`\``, inline: true },
                { name: locale.size, value: `\`\`\`${data.width}x${data.height}\`\`\``, inline: true },
                { name: locale.batch_size, value: `\`\`\`${data.batch_size}\`\`\``, inline: true },
                { name: locale.n_iter, value: `\`\`\`${data.n_iter}\`\`\``, inline: true },
                { name: locale.seed, value: `\`\`\`${data.seed}\`\`\``, inline: true },
            ],
            footer: {
                text: locale.request_modal_footer
            },
            color: 0x7289da
        }),
    update: (embed: APIEmbed, locale: LocaleData, data: Parameter): EmbedBuilder =>
        new EmbedBuilder(embed)
            .setFields(
                { name: locale.prompt, value: `\`\`\`${data.prompt || ''}\`\`\`` },
                { name: locale.negative_prompt, value: `\`\`\`${data.negative_prompt || ' '}\`\`\`` },
                { name: locale.sampler, value: `\`\`\`${data.sampler_index || ' '}\`\`\``, inline: true },
                { name: locale.steps, value: `\`\`\`${data.steps}\`\`\``, inline: true },
                { name: locale.cfg_scale, value: `\`\`\`${data.cfg_scale}\`\`\``, inline: true },
                { name: locale.size, value: `\`\`\`${data.width}x${data.height}\`\`\``, inline: true },
                { name: locale.batch_size, value: `\`\`\`${data.batch_size}\`\`\``, inline: true },
                { name: locale.n_iter, value: `\`\`\`${data.n_iter}\`\`\``, inline: true },
                { name: locale.seed, value: `\`\`\`${data.seed}\`\`\``, inline: true }
            )

}

export default Txt2imgEmbed;