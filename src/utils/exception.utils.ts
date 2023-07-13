import { Embed as DiscordEmbed, RepliableInteraction } from "discord.js";
import { LocaleData, f } from "../i18n.ts";
import { deferDeleteReply } from "./interaction.utils.ts";


export const checkInteger = (interaction: RepliableInteraction, locale: LocaleData, name: string, value?: any) => {
    if (typeof (value) === 'number' && !Number.isInteger(value)) {
        interaction.reply({
            content: f(locale.exceptions.type_int, { name, value })
        });
        deferDeleteReply(interaction);
        return true;
    }
    return false;
}


export const checkIntegerRange = (interaction: RepliableInteraction, locale: LocaleData, name: string, min: number, max: number, value?: any) => {
    if (typeof (value) === 'number') return false;

    if (!Number.isInteger(value)) {
        interaction.reply({
            content: f(locale.exceptions.type_int, { name, value })
        });
        deferDeleteReply(interaction);
        return true;
    }

    if (value < min || value > max) {
        interaction.reply({
            content: f(locale.exceptions.outOfRange, {
                name,
                value,
                a: min,
                b: max
            })
        });
        deferDeleteReply(interaction);
        return true;
    }

    return false;
}


export const checkEmpty = (interaction: RepliableInteraction, locale: LocaleData, name: string, value?: any) => {
    if (value) return false;
    interaction.reply({
        content: f(locale.exceptions.empty, { name })
    });
    deferDeleteReply(interaction);
    return true;
}


export const checkNoParameter = (interaction: RepliableInteraction, locale: LocaleData, embed: DiscordEmbed) => {
    if (embed) return false;
    interaction.reply({ content: locale.exceptions.no_parameters });
    deferDeleteReply(interaction);
    return true;
}