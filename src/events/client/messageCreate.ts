import { Message } from "discord.js";
import bot from "../../bot.ts";
import logger from "../../logger.ts";

export default {
    name: 'messageCreate',
    execute: async (message: Message) => {
        const content = message.content;
        if (message.author.id === bot.user.id) return;
        logger.info(message);
        // if (content.startsWith('!') && content.indexOf('\n') !== -1) {
        //     const end = content.indexOf('\n');
        //     const lang = content.substring(1, end);
        //     if (!appLaunchers.get(lang)) return;

        //     const _code = content.substring(end+1);
        //     let code: string;
        //     if (_code.startsWith('```')) {
        //         code = _code.substring(_code.indexOf('\n')+1, _code.lastIndexOf('\n'));
        //     } else if (_code.startsWith('`')) {
        //         code = _code.substring(1, _code.length - 1);
        //     } else {
        //         code = _code;
        //     }
        //     if (!code.length) return;
        //     const result = appLaunchers.get(lang)(code);
        //     message.reply(`執行結果:\n${result}`);
        // }
    }
}