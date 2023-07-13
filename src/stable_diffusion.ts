import axios, { AxiosInstance } from 'axios';
import { AttachmentBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import logger, { fatal } from './logger.ts';
import { IMG_2_IMG_URL, MODELS_URL, OPTIONS_URL, PROGRESS_URL, SAMPLERS_URL, SYSINFO_URL, TXT_2_IMG_URL } from './reference.ts';
import { Img2imgParameter, Img2imgRequestBody, Model, Progress, Sampler, StableDiffusionClientConfig, StableDiffusionOptions, Txt2imgParameter, Txt2imgRequestBody } from './types/type.js';

export class StableDiffusionClient {
    // Variables
    _: StableDiffusionClientConfig;

    helper: AxiosInstance

    // Stable Diffusion Server Options
    options: StableDiffusionOptions;

    samplers: Sampler[];
    models: { [modelHash: string]: Model };
    currentModel: Model;
    currentModelPreview: Buffer;
    _currentModelPreview: AttachmentBuilder;

    constructor(options: StableDiffusionClientConfig) {
        if (!options.Host)
            fatal("Stable Diffusion Host should not be empty");
        if (!options.Port)
            fatal("Stable Diffusion Port should not be empty");
        if (!options.Path)
            fatal("Stable Diffusion Path should not be empty");
        this._ = options;
        this.init();
    }

    /**
     * Initialize Variables
     */
    private init(): void {
        if (!this._.MaxSteps || !Number.isInteger(this._.MaxSteps)) {
            logger.warn("Stable Diffuion max steps should be a integer. It has been set to default(50)");
            this._.MaxSteps = 50;
        }
        if (!this._.MinSteps || !Number.isInteger(this._.MinSteps)) {
            logger.warn("Stable Diffuion min steps should be a integer. It has been set to default(1)");
            this._.MinSteps = 1;
        }
        if (!this._.DefaultSteps || !Number.isInteger(this._.DefaultSteps)) {
            logger.warn("Stable Diffuion default steps should be a integer. It has been set to default(20)");
            this._.DefaultSteps = 20;
        }
        if (!this._.DefaultCFGScale || !Number.isInteger(this._.DefaultCFGScale)) {
            logger.warn("Stable Diffuion default cfg sale should be a integer. It has been set to default(7)");
            this._.DefaultCFGScale = 7;
        }
        if (!this._.DefaultSampler) {
            logger.warn("Stable Diffuion default sampler should not be empty. It has been set to default(Euler A)");
            this._.DefaultSampler = "Euler A";
        }
        if (!this._.DefaultBatchSize) {
            logger.warn("Stable Diffuion default batch size should be a integer. It has been set to default(1)");
            this._.DefaultBatchSize = 1;
        }
        if (!this._.DefaultNIter) {
            logger.warn("Stable Diffuion default n_iter should be a integer. It has been set to default(1)");
            this._.DefaultNIter = 1;
        }
        if (!this._.DefaultSeed) {
            logger.warn("Stable Diffuion default seed should be a integer. It has been set to default(-1)");
            this._.DefaultSeed = 1;
        }
        if (!this._.DefaultWidth) {
            logger.warn("Stable Diffuion default width should be a integer. It has been set to default(512)");
            this._.DefaultWidth = 512;
        }
        if (!this._.DefualtHeight) {
            logger.warn("Stable Diffuion default height should be a integer. It has been set to default(512)");
            this._.DefualtHeight = 512;
        }
        logger.info(this._, "Stable Diffusion Config:")
        this.samplers = [];
        this.models = {};
        this.helper = axios.create({
            baseURL: `http://${this._.Host}:${this._.Port}`,
            timeout: 180000,
        });
    }

    public async load(): Promise<void> {
        // Models
        const { data: models } = await this.helper.get(MODELS_URL).catch(() => {
            fatal(`Couldn't get models from ${this.helper.defaults.baseURL}${MODELS_URL}`)
        }) as any;
        for (const model of models) {
            this.models[model.model_name] = model;
            logger.info(`${model.model_name} ${model.title}`);
        }

        // Samplers
        const { data: samplers } = await this.helper.get(SAMPLERS_URL).catch(() => {
            fatal(`Couldn't get samplers from ${this.helper.defaults.baseURL}${MODELS_URL}`)
        }) as any;
        for (const sampler of samplers) {
            this.samplers.push(sampler as Sampler);
        }
        if (!this.samplers.find(sampler => sampler.name === this._.DefaultSampler)) {
            logger.warn(`Couldn't find sampler that equals to default sampler ${this._.DefaultSampler}. Default sampler has been set to ${this.samplers[0].name}`);
            this._.DefaultSampler = this.samplers[0].name;
        }

        // Sysinfo
        const { data: sysinfo } = await this.helper.get(SYSINFO_URL).catch(() => {
            fatal(`Couldn't get sysinfo from ${this.helper.defaults.baseURL}${SYSINFO_URL}`)
        }) as any;
        this.currentModel = models.find((model: Model) => model.title === sysinfo.Config.sd_model_checkpoint);
        this.currentModelPreview = readFileSync(`${this._.Path}/models/Stable-diffusion/${this.currentModel.model_name}.preview.png`)
        this._currentModelPreview = new AttachmentBuilder(stableDiffusion.currentModelPreview, { name: 'preview.png' })

        // console.log(sysinfo.Config);
        logger.info(`using model: ${this.currentModel.model_name}`);
    }

    public changeModel = async (model: Model): Promise<Model> =>
        this.helper.post(OPTIONS_URL, { "sd_model_checkpoint": model.title })
            .then(() => this.currentModel = model);

    public requestTxt2img = async ({ prompt, negative_prompt, sampler_index, cfg_scale, width, height, batch_size, n_iter, seed, steps }: Txt2imgParameter): Promise<string[]> => {
        const req: Txt2imgRequestBody = {
            prompt,
            negative_prompt,
            sampler_index: sampler_index || this._.DefaultSampler,
            cfg_scale: cfg_scale || this._.DefaultCFGScale,
            width: width || this._.DefaultWidth,
            height: height || this._.DefualtHeight,
            batch_size: batch_size || this._.DefaultBatchSize,
            n_iter: n_iter || this._.DefaultNIter,
            seed: seed || this._.DefaultSeed,
            steps: steps || this._.DefaultSteps,
            save_images: true,
        }
        const { data } = await this.helper.post(TXT_2_IMG_URL, req);
        return data.images;
    }

    public requestImg2img = async ({ prompt, negative_prompt, sampler_index, cfg_scale, width, height, batch_size, n_iter, seed, steps, init_images }: Img2imgParameter): Promise<string[]> => {
        const req: Img2imgRequestBody = {
            prompt,
            negative_prompt,
            sampler_index: sampler_index || this._.DefaultSampler,
            cfg_scale: cfg_scale || this._.DefaultCFGScale,
            width: width || this._.DefaultWidth,
            height: height || this._.DefualtHeight,
            batch_size: batch_size || this._.DefaultBatchSize,
            n_iter: n_iter || this._.DefaultNIter,
            seed: seed || this._.DefaultSeed,
            steps: steps || this._.DefaultSteps,
            init_images,
            save_images: true,
        }
        const { data } = await this.helper.post(IMG_2_IMG_URL, req);
        return data.images;
    }

    public requestProgress = async (): Promise<Progress> =>
        this.helper.get(PROGRESS_URL).then(({ data }) => data);
}


const stableDiffusion = new StableDiffusionClient({
    Host: process.env.SD_HOST,
    Port: process.env.SD_PORT,
    Path: process.env.SD_PATH,
    MinSteps: Number(process.env.SD_MIN_STEPS),
    MaxSteps: Number(process.env.SD_MAX_STEPS),
    MinWidth: Number(process.env.SD_MIN_WIDTH),
    MaxWidth: Number(process.env.SD_MAX_WIDTH),
    MinHeight: Number(process.env.SD_MIN_HEIGHT),
    MaxHeight: Number(process.env.SD_MAX_HEIGHT),
    MinBatchSize: Number(process.env.SD_MIN_BATCH_SIZE),
    MaxBatchSize: Number(process.env.SD_MAX_BATCH_SIZE),
    MinNIter: Number(process.env.SD_MIN_N_ITER),
    MaxNIter: Number(process.env.SD_MAX_N_ITER),
    DefaultSteps: Number(process.env.SD_DEFAULT_STEPS),
    DefaultCFGScale: Number(process.env.SD_DEFAULT_CFG_SCALE),
    DefaultSampler: process.env.SD_DEFAULT_SAMPLER,
    DefaultBatchSize: Number(process.env.SD_DEFAULT_BATCH_SIZE),
    DefaultNIter: Number(process.env.SD_DEFAULT_N_ITER),
    DefaultSeed: Number(process.env.SD_DEFAULT_SEED),
    DefaultWidth: Number(process.env.SD_DEFAULT_WIDTH),
    DefualtHeight: Number(process.env.SD_DEFAULT_HEIGHT),
});

export const defaultTxt2imgParameter: Txt2imgParameter = {
    prompt: "",
    negative_prompt: "",
    sampler_index: stableDiffusion._.DefaultSampler,
    steps: stableDiffusion._.DefaultSteps,
    cfg_scale: stableDiffusion._.DefaultCFGScale,
    width: stableDiffusion._.DefaultWidth,
    height: stableDiffusion._.DefualtHeight,
    seed: stableDiffusion._.DefaultSeed,
    batch_size: stableDiffusion._.DefaultBatchSize,
    n_iter: stableDiffusion._.DefaultNIter
}

export const defaultImg2imgParameter: Img2imgParameter = {
    prompt: "",
    negative_prompt: "",
    sampler_index: stableDiffusion._.DefaultSampler,
    steps: stableDiffusion._.DefaultSteps,
    cfg_scale: stableDiffusion._.DefaultCFGScale,
    width: stableDiffusion._.DefaultWidth,
    height: stableDiffusion._.DefualtHeight,
    seed: stableDiffusion._.DefaultSeed,
    batch_size: stableDiffusion._.DefaultBatchSize,
    n_iter: stableDiffusion._.DefaultNIter,
    init_images: []
}

export default stableDiffusion