import { Message, User } from "discord.js";
import ProgressBuilder from "../builders/progress.builder.ts";
import Txt2imgResultBuilder from "../builders/txt2imgResult.builder.ts";
import { LocaleData, f } from "../i18n.ts";
import logger from "../logger.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { AnyParameter, Method, Progress } from "../types/type.js";

const { PROGRESS_INTERVAL } = process.env;

const progressInterval = Number(PROGRESS_INTERVAL) || 1000;
if (!Number(PROGRESS_INTERVAL))
    logger.warn("Progress interval should be a integer. It has been set to default(1000)");

interface Request {
    method: Method
    user: User,
    progressing?: Message,
    parameterMessage: Message
    locale: LocaleData
    data: AnyParameter
}

let isRequesting = false;
const requestQueue: Request[] = [];

export const handleRequest = async (request: Request) => {
    requestQueue.push(request);
    if (!isRequesting) {
        isRequesting = true;
        processRequest();
    } else {
        request.progressing = await request.parameterMessage.reply({ 'content': f(request.locale.waiting, { value: requestQueue.length }) })
    }
}

const requestFunc: Partial<Record<Method, Function>> = {
    "txt2img": stableDiffusion.requestTxt2img,
    "img2img": stableDiffusion.requestImg2img
}

const processRequest = async () => {
    while (requestQueue.length) {
        const { method, user, progressing: _progressing, parameterMessage, locale, data } = requestQueue.shift()

        // Update Waiting
        for (let i = 0; i != requestQueue.length; i++) {
            requestQueue[i].progressing.edit({ 'content': f(locale.waiting, { value: i + 1 }) })
        }

        // Process current request
        let done = false;

        let progressing = _progressing
            ? await _progressing.edit(ProgressBuilder.build(locale, user))
            : await parameterMessage.reply(ProgressBuilder.build(locale, user));

        // Updating progress
        let lastImage: string = "";
        const messageManager = parameterMessage.channel.messages;
        const interval = setInterval(() =>
            stableDiffusion.requestProgress().then((progress: Progress) => {
                logger.info(`progressing: ${progress.progress}`)

                messageManager.fetch(progressing.id)
                    .then((message: Message) => {
                        progressing = message;
                        if (!done && progressing.editable)
                            progressing.edit(progressing.embeds[0]
                                ? ProgressBuilder.update(progressing.embeds[0], locale, progress, lastImage !== progress.current_image)
                                : ProgressBuilder.build(locale, user))
                    })
                    .catch(() => {
                        logger.info("The original message has been delete.")
                        parameterMessage.reply(ProgressBuilder.build(locale, user)).then(message => progressing = message);
                    })

                lastImage = progress.current_image;
            }), progressInterval)

        // Send request
        await requestFunc[method](data)
            .then((images: string[]) => {
                // Request is done
                done = true;
                clearInterval(interval);
                progressing.edit(Txt2imgResultBuilder.build(locale, user, images))
            })
            .catch((err: any) => {
                // Caught error
                done = true;
                clearInterval(interval);
                logger.error(err);
                progressing.edit({ content: locale.exceptions.unknown })
            })
    }
    isRequesting = false;
}