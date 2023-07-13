import {
    ActionRowBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import Txt2imgEmbed from "../../embeds/txt2img.embed.ts";
import { LocaleData, f, t } from "../../i18n.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Modal, Parameter } from "../../types/type.js";
import { checkInteger, checkIntegerRange, checkNoParameter } from "../../utils/exception.utils.ts";
import { getParameter } from "../../utils/parameter.utils.ts";

interface ITxt2imgSetting1Modal extends Modal {
    build(locale: LocaleData, data: Parameter): ModalBuilder
}

const Txt2imgSetting2Modal: ITxt2imgSetting1Modal = {
    name: "txt2imgSetting2Modal",
    build: (locale: LocaleData, data: Parameter) => {
        const widthText = new TextInputBuilder({
            custom_id: "width",
            label: `${locale.width}${f(locale.default, { value: stableDiffusion._.DefaultWidth })}${f(locale.range, { a: stableDiffusion._.MinWidth, b: stableDiffusion._.MaxWidth })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.width,
            value: data.width.toString()
        })

        const heightText = new TextInputBuilder({
            custom_id: "height",
            label: `${locale.height}${f(locale.default, { value: stableDiffusion._.DefualtHeight })}${f(locale.range, { a: stableDiffusion._.MinHeight, b: stableDiffusion._.MaxHeight })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.height,
            value: data.height.toString()
        })

        const batchSizeText = new TextInputBuilder({
            custom_id: "batch_size",
            label: `${locale.batch_size}${f(locale.default, { value: stableDiffusion._.DefaultBatchSize })}${f(locale.range, { a: stableDiffusion._.MinBatchSize, b: stableDiffusion._.MaxBatchSize })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.batch_size,
            value: data.batch_size.toString()
        })

        const nIterText = new TextInputBuilder({
            custom_id: "n_iter",
            label: `${locale.n_iter}${f(locale.default, { value: stableDiffusion._.DefaultNIter })}${f(locale.range, { a: stableDiffusion._.MinNIter, b: stableDiffusion._.MaxNIter })}`,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.n_iter,
            value: data.n_iter.toString()
        })

        const seedText = new TextInputBuilder({
            custom_id: "seed",
            label: `${locale.seed}${f(locale.default, { value: stableDiffusion._.DefaultSeed })}`,
            style: TextInputStyle.Short,
            max_length: 20,
            placeholder: locale.tips.seed,
            value: data.seed.toString()
        })

        const modal = new ModalBuilder({
            custom_id: Txt2imgSetting2Modal.name,
            title: locale.txt2img,
            components: [
                new ActionRowBuilder<TextInputBuilder>({ components: [widthText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [heightText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [batchSizeText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [nIterText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [seedText] })
            ]
        })

        return modal;
    },
    onInteraction: async (interaction: ModalSubmitInteraction) => {
        const locale = t(interaction);
        const embed = interaction.message.embeds[0];
        if (checkNoParameter(interaction, locale, embed)) return;

        const width = Number(interaction.fields.getTextInputValue('width'));
        if (checkIntegerRange(interaction, locale, locale.width, stableDiffusion._.MinWidth, stableDiffusion._.MaxWidth, width)) return;
        const height = Number(interaction.fields.getTextInputValue('height'));
        if (checkIntegerRange(interaction, locale, locale.height, stableDiffusion._.MinHeight, stableDiffusion._.MaxHeight, height)) return;
        const batch_size = Number(interaction.fields.getTextInputValue('batch_size'));
        if (checkIntegerRange(interaction, locale, locale.batch_size, stableDiffusion._.MinBatchSize, stableDiffusion._.MaxBatchSize, batch_size)) return;
        const n_iter = Number(interaction.fields.getTextInputValue('n_iter'));
        if (checkIntegerRange(interaction, locale, locale.n_iter, stableDiffusion._.MinNIter, stableDiffusion._.MaxNIter, n_iter)) return;
        const seed = Number(interaction.fields.getTextInputValue('seed'));
        if (checkInteger(interaction, locale, locale.seed, seed)) return;

        const data = getParameter(embed);
        data.width = width;
        data.height = height;
        data.batch_size = batch_size;
        data.n_iter = n_iter;
        data.seed = seed;
        interaction.message.edit({ embeds: [Txt2imgEmbed.update(embed, locale, data)] })
        interaction.deferUpdate();
    }
}

export default Txt2imgSetting2Modal;