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
import { Modal, Parameter } from "../../types.js";
import { checkIntegerRange } from "../../utils/assert.utils.ts";
import { getParameter } from "../../utils/parameter.utils.ts";
import { checkInteger } from './../../utils/assert.utils.ts';

interface ITxt2imgSetting1Modal extends Modal {
    build(locale: LocaleData, data: Parameter): ModalBuilder
}

const Txt2imgSetting2Modal: ITxt2imgSetting1Modal = {
    name: "txt2imgSetting2Modal",
    build: (locale: LocaleData, data: Parameter) => {
        const widthText = new TextInputBuilder()
            .setCustomId("width")
            .setLabel(`${locale.width}${f(locale.default, { value: stableDiffusion._.DefaultWidth })}${f(locale.range, { a: stableDiffusion._.MinWidth, b: stableDiffusion._.MaxWidth })}`)
            .setStyle(TextInputStyle.Short)
            .setValue(data.width.toString())

        const heightText = new TextInputBuilder()
            .setCustomId("height")
            .setLabel(`${locale.height}${f(locale.default, { value: stableDiffusion._.DefualtHeight })}${f(locale.range, { a: stableDiffusion._.MinHeight, b: stableDiffusion._.MaxHeight })}`)
            .setStyle(TextInputStyle.Short)
            .setValue(data.height.toString())

        const seedText = new TextInputBuilder()
            .setCustomId("seed")
            .setLabel(`${locale.seed}${f(locale.default, { value: stableDiffusion._.DefaultSeed })}`)
            .setStyle(TextInputStyle.Short)
            .setValue(data.seed.toString())

        const batchSizeText = new TextInputBuilder()
            .setCustomId("batch_size")
            .setLabel(`${locale.batch_size}${f(locale.default, { value: stableDiffusion._.DefaultBatchSize })}${f(locale.range, { a: stableDiffusion._.MinBatchSize, b: stableDiffusion._.MaxBatchSize })}`)
            .setStyle(TextInputStyle.Short)
            .setValue(data.batch_size.toString())

        const nIterText = new TextInputBuilder()
            .setCustomId("n_iter")
            .setLabel(`${locale.n_iter}${f(locale.default, { value: stableDiffusion._.DefaultNIter })}${f(locale.range, { a: stableDiffusion._.MinNIter, b: stableDiffusion._.MaxNIter })}`)
            .setStyle(TextInputStyle.Short)
            .setValue(data.n_iter.toString())

        const modal = new ModalBuilder()
            .setCustomId(Txt2imgSetting2Modal.name)
            .setTitle(locale.txt2img)

        modal.addComponents(
            new ActionRowBuilder({ components: [widthText] }),
            new ActionRowBuilder({ components: [heightText] }),
            new ActionRowBuilder({ components: [seedText] }),
            new ActionRowBuilder({ components: [batchSizeText] }),
            new ActionRowBuilder({ components: [nIterText] })
        );

        return modal;
    },
    onInteraction: async (interaction: ModalSubmitInteraction) => {
        const locale = t(interaction);
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

		const data = getParameter(interaction.message.embeds[0]);
        data.width = width;
        data.height = height;
        data.batch_size = batch_size;
        data.n_iter = n_iter;
        data.seed = seed;
        interaction.message.edit({ embeds: [Txt2imgEmbed.build(locale, data)] });
        interaction.deferUpdate();
    }
}

export default Txt2imgSetting2Modal;