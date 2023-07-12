import { Message } from "discord.js";
import ProgressBuilder from "../builders/progress.builder.ts";
import Txt2imgResultBuilder from "../builders/txt2imgResult.builder.ts";
import { LocaleData, f } from "../i18n.ts";
import logger from "../logger.ts";
import stableDiffusion from "../stable_diffusion.ts";
import { AnyParameter, Method, Progress } from "../types.js";

const { PROGRESS_INTERVAL } = process.env;

const progressInterval = Number(PROGRESS_INTERVAL) || 1000;
if (!Number(PROGRESS_INTERVAL))
    logger.warn("Progress interval should be a integer. It has been set to default(1000)");

interface Request {
    method: Method
    progressing?: Message,
    message: Message
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
        request.progressing = await request.message.reply({ 'content': f(request.locale.waiting, { value: requestQueue.length }) })
    }
}

const requestFunc: Partial<Record<Method, Function>> = {
    "txt2img": stableDiffusion.requestTxt2img,
    "img2img": stableDiffusion.requestImg2img
}

const processRequest = async () => {
    while (requestQueue.length) {
        const { method, progressing, message, locale, data } = requestQueue.shift()

        // Update Waiting
        for (let i = 0; i != requestQueue.length; i++) {
            requestQueue[i].progressing.edit({ 'content': f(locale.waiting, { value: i+1 }) })
        }
        
        // Process current request
        let done = false;

        let _progressing = progressing
            ? await progressing.edit(ProgressBuilder.build(locale))
            : await message.reply(ProgressBuilder.build(locale));

        // Updating progress
        let lastImage: string = "";
        const interval = setInterval(() =>
            stableDiffusion.requestProgress().then((progress: Progress) => {
                logger.info(`progressing: ${progress.progress}`)
                if (!done) _progressing.edit(ProgressBuilder.update(locale, progress, lastImage !== progress.current_image))
                lastImage = progress.current_image;
            }), progressInterval)

        // Send request
        await requestFunc[method](data)
            .then((images: string[]) => {
                // Request is done
                done = true;
                clearInterval(interval);
                _progressing.edit(Txt2imgResultBuilder.build(locale, images))
            })
            .catch((err: any) => {
                // Caught error
                done = true;
                clearInterval(interval);
                logger.error(err);
                _progressing.edit({ content: locale.exceptions.unknown })
            })
    }
    isRequesting = false;
}