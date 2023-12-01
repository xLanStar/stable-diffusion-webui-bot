import { RepliableInteraction } from "discord.js";
import { LocaleData, f } from "../i18n";
import { alertReply } from "./interaction.utils";


export const checkInteger = (interaction: RepliableInteraction, locale: LocaleData, name: string, value?: any) => {
    if (typeof (value) === 'number' && !Number.isInteger(value)) {
        alertReply(interaction, f(locale.exceptions.type_int, { name, value }))
        return true;
    }
    return false;
}


export const checkIntegerRange = (interaction: RepliableInteraction, locale: LocaleData, name: string, min: number, max: number, value?: any) => {
    if (typeof (value) === 'number') return false;

    if (!Number.isInteger(value)) {
        alertReply(interaction, f(locale.exceptions.type_int, { name, value }))
        return true;
    }

    if (value < min || value > max) {
        alertReply(interaction, f(locale.exceptions.outOfRange, {
            name,
            value,
            a: min,
            b: max
        }))
        return true;
    }

    return false;
}


export const checkEmpty = (interaction: RepliableInteraction, locale: LocaleData, name: string, value?: any) => {
    if (value && (typeof (value) === 'string' ? value.trim() : true)) return false;
    alertReply(interaction, f(locale.exceptions.empty, { name }))
    return true;
}
