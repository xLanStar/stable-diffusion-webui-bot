import {
    ActionRowBuilder,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import RequestEmbed from "../../embeds/request.embed.ts";
import { LocaleData, f, t } from "../../i18n.ts";
import stableDiffusion from "../../stable_diffusion.ts";
import { Modal, Parameter } from "../../types/type.js";
import { checkInteger, checkIntegerRange } from "../../utils/exception.utils.ts";
import { getRequestInput } from "../../utils/parameter.utils.ts";

interface IRequestSetting2Modal extends Modal {
    build(locale: LocaleData, parameter: Parameter): ModalBuilder
}

const RequestSetting2Modal: IRequestSetting2Modal = {
    name: "requestSetting2Modal",
    build: (locale: LocaleData, parameter: Parameter) => {
        const widthText = new TextInputBuilder({
            custom_id: "width",
            label: `${locale.width}${f(locale.default, { value: stableDiffusion._.DefaultWidth })}${f(locale.range, { a: stableDiffusion._.MinWidth, b: stableDiffusion._.MaxWidth })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.width,
            value: parameter.width.toString()
        })

        const heightText = new TextInputBuilder({
            custom_id: "height",
            label: `${locale.height}${f(locale.default, { value: stableDiffusion._.DefualtHeight })}${f(locale.range, { a: stableDiffusion._.MinHeight, b: stableDiffusion._.MaxHeight })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.height,
            value: parameter.height.toString()
        })

        const batchSizeText = new TextInputBuilder({
            custom_id: "batch_size",
            label: `${locale.batch_size}${f(locale.default, { value: stableDiffusion._.DefaultBatchSize })}${f(locale.range, { a: stableDiffusion._.MinBatchSize, b: stableDiffusion._.MaxBatchSize })}`,
            style: TextInputStyle.Short,
            max_length: 5,
            placeholder: locale.tips.batch_size,
            value: parameter.batch_size.toString()
        })

        const nIterText = new TextInputBuilder({
            custom_id: "n_iter",
            label: `${locale.n_iter}${f(locale.default, { value: stableDiffusion._.DefaultNIter })}${f(locale.range, { a: stableDiffusion._.MinNIter, b: stableDiffusion._.MaxNIter })}`,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.n_iter,
            value: parameter.n_iter.toString()
        })

        const seedText = new TextInputBuilder({
            custom_id: "seed",
            label: `${locale.seed}${f(locale.default, { value: stableDiffusion._.DefaultSeed })}`,
            style: TextInputStyle.Short,
            max_length: 20,
            placeholder: locale.tips.seed,
            value: parameter.seed.toString()
        })

        const modal = new ModalBuilder({
            custom_id: RequestSetting2Modal.name,
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
        const requestInput = await getRequestInput(interaction, locale, interaction.message);
        if (!requestInput) return;

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

        requestInput.parameter.width = width;
        requestInput.parameter.height = height;
        requestInput.parameter.batch_size = batch_size;
        requestInput.parameter.n_iter = n_iter;
        requestInput.parameter.seed = seed;

        interaction.message.edit({ embeds: [RequestEmbed.update(interaction.message.embeds[0], locale, requestInput.parameter)] })
        interaction.deferUpdate();
    }
}

export default RequestSetting2Modal;