import {
  ButtonBuilder,
  ClientOptions,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  LocaleString,
  ModalBuilder,
  RepliableInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { LocaleData } from "../i18n.ts";
import { Methods } from "./enums.ts";

export declare type InteractionHandler = (
  interaction: RepliableInteraction,
  ...args: any[]
) => Promise<any>;
export interface INamable {
  name: string;
}
export interface IInteractable extends INamable {
  name: string;
  onInteraction: InteractionHandler;
}

// Command
export interface Command extends IInteractable {
  command: ContextMenuCommandBuilder | SlashCommandBuilder;
  onInteraction: InteractionHandler;
}

// Component
export declare enum ComponentType {
  Button,
  SelectMenu,
  Modal,
}
export interface IBuildable<T> {
  build: (locale: LocaleData, ..._: any[]) => T;
  static?: Partial<Record<LocaleString, T>>;
  prebuild?: boolean;
}
// Component
export interface Component<T> extends IInteractable, IBuildable<T> {}
export interface Button extends Component<ButtonBuilder> {}
export interface Modal extends Component<ModalBuilder> {}
export interface Menu extends Component<StringSelectMenuBuilder> {}
// Embed
export interface Embed extends INamable, IBuildable<EmbedBuilder> {}
// Builder
export interface Builder extends INamable, IBuildable<any> {}

export declare type BotConfig = ClientOptions & {
  token: string;
  clientId: string;
  timeout?: number;
};

// Common Parameter for txt2img and img2img
export interface Parameter {
  prompt: string;
  negative_prompt: string;
  sampler_index: string;
  steps: number;
  cfg_scale: number;
  width: number;
  height: number;
  seed: number;
  batch_size: number;
  n_iter: number;
}
export interface Txt2imgParameter extends Parameter {}
export interface Img2imgParameter extends Parameter {
  init_images: string[];
}
export declare type AnyParameter = Txt2imgParameter | Img2imgParameter;
export interface Txt2imgRequestInput {
  method: Methods.txt2img;
  parameter: Txt2imgParameter;
}
export interface Img2imgRequestInput {
  method: Methods.img2img;
  parameter: Img2imgParameter;
}
export interface RequestInput {
  method: Method;
  parameter: Txt2imgParameter | Img2imgParameter;
  processImageUrl?: string;
}
export interface Img2imgRequestInput extends RequestInput {
  processImageUrl: string;
}

// Stable Diffusion web UI
export interface Model {
  title: string;
  model_name: string;
  hash: string;
  sha256: string;
  filename: string;
  config: any;
}

export interface StableDiffusionClientConfig {
  Host: string;
  Port: string;
  Path: string;
  MinSteps?: number;
  MaxSteps?: number;
  MinWidth?: number;
  MaxWidth?: number;
  MinHeight?: number;
  MaxHeight?: number;
  MinBatchSize?: number;
  MaxBatchSize?: number;
  MinNIter?: number;
  MaxNIter?: number;
  Samplers?: string[];
  DefaultSteps?: number;
  DefaultCFGScale?: number;
  DefaultSampler?: string;
  DefaultWidth?: number;
  DefualtHeight?: number;
  DefaultNIter?: number;
  DefaultBatchSize?: number;
  DefaultSeed?: number;
}
export interface StableDiffusionOptions {
  sd_model_checkpoint: string;
}
//
export declare type Method = keyof typeof Methods;
export interface ExtraParameter {
  save_images: boolean;
}
export interface Txt2imgRequestBody extends Txt2imgParameter, ExtraParameter {}
export interface Img2imgRequestBody extends Img2imgParameter, ExtraParameter {}
export interface Progress {
  progress: number;
  eta_relative: number;
  state: {
    skipped: false;
    interrupted: false;
    job: string;
    job_count: number;
    job_timestamp: string;
    job_no: number;
    sampling_step: number;
    sampling_steps: number;
  };
  current_image: string;
  textinfo: string;
}
export interface Sampler {
  name: string;
  aliases: string[];
  options: object;
}
