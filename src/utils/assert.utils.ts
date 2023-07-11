import { ButtonInteraction, InteractionResponse, ModalSubmitInteraction } from "discord.js";
import { LocaleData, f } from "../i18n.ts";

export const checkInteger = (interaction: ModalSubmitInteraction, locale: LocaleData, name: string, value?: any): Promise<InteractionResponse<boolean>> =>
    (typeof (value) === 'number' && !Number.isInteger(value))
        ? interaction.reply({
            content: f(locale.exceptions.type_int, { name, value })
        })
        : null;


export const checkIntegerRange = (interaction: ModalSubmitInteraction, locale: LocaleData, name: string, min: number, max: number, value?: any): Promise<InteractionResponse<boolean>> =>
    (typeof (value) === 'number')
        ? Number.isInteger(value)
            ? (value < min || value > max)
                ? interaction.reply({
                    content: f(locale.exceptions.outOfRange, {
                        value: locale.steps,
                        a: min,
                        b: max
                    })
                })
                : null
            : interaction.reply({
                content: f(locale.exceptions.type_int, { name, value })
            })
        : null;


export const checkEmpty = (interaction: ButtonInteraction | ModalSubmitInteraction, locale: LocaleData, name: string, value?: any): Promise<InteractionResponse<boolean>> =>
    !value
        ? interaction.reply({
            content: f(locale.exceptions.empty, { name })
        })
        : null;