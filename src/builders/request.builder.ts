import { APIEmbed, AttachmentBuilder, User } from "discord.js";
import RequestEmbed from "../embeds/request.embed.ts";
import { LocaleData } from "../i18n.ts";
import { Builder, Parameter, RequestInput } from "../types/type.js";
import RequestComponentsBuilder from "./request.component.builder.ts";

interface IRequestBuilder extends Builder {
  build: (
    locale: LocaleData,
    user: User,
    requestInput: RequestInput,
    processImageUrl?: string
  ) => any;
  update: (
    embed: APIEmbed,
    locale: LocaleData,
    parameter: Parameter,
    processImageUrl?: string
  ) => any;
}

const RequestBuilder: IRequestBuilder = {
  name: "request",
  build: (
    locale: LocaleData,
    user: User,
    requestInput: RequestInput,
    processImageUrl: string = requestInput.processImageUrl
  ) => ({
    embeds: [RequestEmbed.build(locale, user, requestInput)],
    components: RequestComponentsBuilder.static[locale._key],
    files: processImageUrl
      ? [new AttachmentBuilder(processImageUrl, { name: "process.png" })] // Override model's preview image
      : [],
  }),
  update: (
    embed: APIEmbed,
    locale: LocaleData,
    parameter: Parameter,
    processImageUrl?: string
  ) => ({
    embeds: [RequestEmbed.update(embed, locale, parameter)],
    components: RequestComponentsBuilder.static[locale._key],
    files: processImageUrl
      ? [processImageUrl] // Override model's preview image
      : [],
  }),
};

export default RequestBuilder;
