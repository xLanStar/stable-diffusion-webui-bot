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

interface IRequestSetting1Modal extends Modal {
    build(locale: LocaleData, parameter: Parameter): ModalBuilder
}

const RequestSetting1Modal: IRequestSetting1Modal = {
    name: "requestSetting1Modal",
    build: (locale: LocaleData, parameter: Parameter) => {
        const promptText = new TextInputBuilder({
            custom_id: "prompt",
            label: locale.prompt,
            style: TextInputStyle.Paragraph,
            max_length: 1018, // 1024 - prefix(```) - suffix(```)
            placeholder: locale.tips.prompt,
            value: parameter.prompt
        })

        const negativePromptText = new TextInputBuilder({
            custom_id: "negative",
            label: locale.negative_prompt,
            style: TextInputStyle.Paragraph,
            max_length: 1018, // 1024 - prefix(```) - suffix(```)
            placeholder: locale.tips.negative_prompt,
            value: parameter.negative_prompt
        })

        const stepsText = new TextInputBuilder({
            custom_id: "steps",
            label: `${locale.steps}${f(locale.range, { a: stableDiffusion._.MinSteps, b: stableDiffusion._.MaxSteps })}`,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.steps,
            value: parameter.steps.toString()
        })

        const cfgScaleText = new TextInputBuilder({
            custom_id: "cfg_scale",
            label: locale.cfg_scale,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.cfg_scale,
            value: parameter.cfg_scale.toString()
        })

        const modal = new ModalBuilder({
            custom_id: RequestSetting1Modal.name,
            title: locale.txt2img,
            components: [
                new ActionRowBuilder<TextInputBuilder>({ components: [promptText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [negativePromptText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [stepsText] }),
                new ActionRowBuilder<TextInputBuilder>({ components: [cfgScaleText] })
            ]
        })

        return modal;
    },
    onInteraction: async (interaction: ModalSubmitInteraction) => {
        const locale = t(interaction);
        const requestInput = await getRequestInput(interaction, locale, interaction.message);
        if (!requestInput) return;

        const prompt = interaction.fields.getTextInputValue('prompt');
        const steps = Number(interaction.fields.getTextInputValue('steps'));
        if (checkIntegerRange(interaction, locale, locale.steps, stableDiffusion._.MinSteps, stableDiffusion._.MaxSteps, steps)) return;
        const cfg_scale = Number(interaction.fields.getTextInputValue('cfg_scale'));
        if (checkInteger(interaction, locale, locale.cfg_scale, cfg_scale)) return;
        const negative_prompt = interaction.fields.getTextInputValue('negative');

        requestInput.parameter.prompt = prompt;
        requestInput.parameter.cfg_scale = cfg_scale;
        requestInput.parameter.steps = steps;
        requestInput.parameter.negative_prompt = negative_prompt;

        interaction.message.edit({ embeds: [RequestEmbed.update(interaction.message.embeds[0], locale, requestInput.parameter)] })
        interaction.deferUpdate()
    }
}

export default RequestSetting1Modal;