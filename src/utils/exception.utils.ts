import { Embed as DiscordEmbed, RepliableInteraction } from "discord.js";
import { LocaleData, f } from "../i18n.ts";
import { alertReply } from "./interaction.utils.ts";


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


export const checkNoParameter = (interaction: RepliableInteraction, locale: LocaleData, embed: DiscordEmbed) => {
    if (embed) return false;
    alertReply(interaction, locale.exceptions.no_parameters)
    return true;
}