import { Interaction, Locale, LocaleString, LocalizationMap } from 'discord.js';
import enUS from './langs/en-US.json' assert { type: "json" };
import zhTW from './langs/zh-TW.json' assert { type: "json" };
import logger from './logger.ts';

export type LocaleData = typeof enUS;

// all languages

export const i18n: Partial<Record<LocaleString, LocaleData>> = {
    [Locale.ChineseTW]: zhTW,
    [Locale.EnglishUS]: enUS
}

// TODO: Load language states
// language state
const _l: { [channelId: string]: LocaleString } = {}
const _t: { [channelId: string]: LocaleData } = {};

// language setter
export const changeLanguage = (channelId: string, lang: LocaleString): LocaleString => {
    logger.info(`change language channelId:${channelId} lang:${lang}`);
    // if (_l[channelId]) {
    //     db.Language.find(({ channelId: _channelId }) => _channelId === channelId).lang = lang;
    // } else {
    //     db.Language.push({ channelId, lang });
    // }
    _t[channelId] = i18n[lang];
    return _l[channelId] = lang;
};
export const changeLocale = (channelId: string, lang: LocaleString): LocaleData => {
    logger.info(`change language channelId:${channelId} lang:${lang}`);
    // if (_l[channelId]) {
    //     db.Language.find(({ channelId: _channelId }) => _channelId === channelId).lang = lang;
    // } else {
    //     db.Language.push({ channelId, lang });
    // }
    return _t[channelId] = i18n[(_l[channelId] = lang)]
}

// language getter
export const l = (interaction: Interaction): LocaleString => _l[interaction.channelId] || changeLanguage(interaction.channelId, interaction.locale);
export const t = (interaction: Interaction): LocaleData => _t[interaction.channelId] || changeLocale(interaction.channelId, interaction.locale);
export const f = (message: string, replacement: object): string => {
    let res = message;
    for (const key of Object.keys(replacement)) {
        res = res.replace(new RegExp(`%${key}%`, 'gi'), replacement[key]);
    }
    return res;
}

// TODO: Description
export const getCommandLocalizations = (key: string): LocalizationMap => {
    return {
        [Locale.ChineseTW]: i18n[Locale.ChineseTW][key],
        [Locale.EnglishUS]: i18n[Locale.EnglishUS][key].toLowerCase(),
    };
}

export const getLocalizations = (key: string): LocalizationMap => {
    return {
        [Locale.ChineseTW]: i18n[Locale.ChineseTW][key],
        [Locale.EnglishUS]: i18n[Locale.EnglishUS][key],
    };
}

// change language
// export const changeLanguage = (lang: string) => {
//     if (i18n[lang]) t = i18n[lang];
// }