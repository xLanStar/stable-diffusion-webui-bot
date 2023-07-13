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
import { getParameter } from './../../utils/parameter.utils.ts';

interface ITxt2imgSetting1Modal extends Modal {
    build(locale: LocaleData, data: Parameter): ModalBuilder
}

const Txt2imgSetting1Modal: ITxt2imgSetting1Modal = {
    name: "txt2imgSetting1Modal",
    build: (locale: LocaleData, data: Parameter) => {
        const promptText = new TextInputBuilder({
            custom_id: "prompt",
            label: locale.prompt,
            style: TextInputStyle.Paragraph,
            max_length: 1018, // 1024 - prefix(```) - suffix(```)
            placeholder: locale.tips.prompt,
            value: data.prompt
        })

        const negativePromptText = new TextInputBuilder({
            custom_id: "negative",
            label: locale.negative_prompt,
            style: TextInputStyle.Paragraph,
            max_length: 1018, // 1024 - prefix(```) - suffix(```)
            placeholder: locale.tips.negative_prompt,
            value: data.negative_prompt
        })

        const stepsText = new TextInputBuilder({
            custom_id: "steps",
            label: `${locale.steps}${f(locale.range, { a: stableDiffusion._.MinSteps, b: stableDiffusion._.MaxSteps })}`,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.steps,
            value: data.steps.toString()
        })

        const cfgScaleText = new TextInputBuilder({
            custom_id: "cfg_scale",
            label: locale.cfg_scale,
            style: TextInputStyle.Short,
            max_length: 4,
            placeholder: locale.tips.cfg_scale,
            value: data.cfg_scale.toString()
        })

        const modal = new ModalBuilder({
            custom_id: Txt2imgSetting1Modal.name,
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
        const embed = interaction.message.embeds[0];
        if (checkNoParameter(interaction, locale, embed)) return;

        const prompt = interaction.fields.getTextInputValue('prompt');
        const steps = Number(interaction.fields.getTextInputValue('steps'));
        if (checkIntegerRange(interaction, locale, locale.steps, stableDiffusion._.MinSteps, stableDiffusion._.MaxSteps, steps)) return;
        const cfg_scale = Number(interaction.fields.getTextInputValue('cfg_scale'));
        if (checkInteger(interaction, locale, locale.cfg_scale, cfg_scale)) return;
        const negative_prompt = interaction.fields.getTextInputValue('negative');

        const data = getParameter(embed);
        data.prompt = prompt;
        data.cfg_scale = cfg_scale;
        data.steps = steps;
        data.negative_prompt = negative_prompt;
        console.log(interaction.message.editable);
        interaction.message.edit({ embeds: [Txt2imgEmbed.update(embed, locale, data)] })
        interaction.deferUpdate()
    }
}

export default Txt2imgSetting1Modal;