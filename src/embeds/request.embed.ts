import { APIEmbed, EmbedBuilder, User } from "discord.js";
import { LocaleData } from "../i18n.ts";
import { Embed, Parameter, RequestInput } from "../types/type.js";

interface IRequestEmbed extends Embed {
  build(
    locale: LocaleData,
    user: User,
    requestInput: RequestInput
  ): EmbedBuilder;
  update(
    embed: APIEmbed,
    locale: LocaleData,
    parameter: Parameter
  ): EmbedBuilder;
}

const RequestEmbed: IRequestEmbed = {
  name: "request",
  build: (
    locale: LocaleData,
    user: User,
    requestInput: RequestInput
  ): EmbedBuilder =>
    new EmbedBuilder({
      author: {
        iconURL: user.avatarURL(),
        name: requestInput.method,
      },
      title: locale.txt2img_parameters,
      fields: [
        {
          name: locale.prompt,
          value: `\`\`\`${requestInput.parameter.prompt || " "}\`\`\``,
        },
        {
          name: locale.negative_prompt,
          value: `\`\`\`${requestInput.parameter.negative_prompt || " "}\`\`\``,
        },
        {
          name: locale.sampler,
          value: `\`\`\`${requestInput.parameter.sampler_index || " "}\`\`\``,
          inline: true,
        },
        {
          name: locale.steps,
          value: `\`\`\`${requestInput.parameter.steps}\`\`\``,
          inline: true,
        },
        {
          name: locale.cfg_scale,
          value: `\`\`\`${requestInput.parameter.cfg_scale}\`\`\``,
          inline: true,
        },
        {
          name: locale.size,
          value: `\`\`\`${requestInput.parameter.width}x${requestInput.parameter.height}\`\`\``,
          inline: true,
        },
        {
          name: locale.batch_size,
          value: `\`\`\`${requestInput.parameter.batch_size}\`\`\``,
          inline: true,
        },
        {
          name: locale.n_iter,
          value: `\`\`\`${requestInput.parameter.n_iter}\`\`\``,
          inline: true,
        },
        {
          name: locale.seed,
          value: `\`\`\`${requestInput.parameter.seed}\`\`\``,
          inline: true,
        },
      ],
      footer: {
        text: locale.request_modal_footer,
      },
      image: {
        url: "attachment://process.png",
      },
      color: 0x7289da,
    }),
  update: (
    embed: APIEmbed,
    locale: LocaleData,
    parameter: Parameter
  ): EmbedBuilder =>
    new EmbedBuilder(embed).setFields(
      { name: locale.prompt, value: `\`\`\`${parameter.prompt || ""}\`\`\`` },
      {
        name: locale.negative_prompt,
        value: `\`\`\`${parameter.negative_prompt || " "}\`\`\``,
      },
      {
        name: locale.sampler,
        value: `\`\`\`${parameter.sampler_index || " "}\`\`\``,
        inline: true,
      },
      {
        name: locale.steps,
        value: `\`\`\`${parameter.steps}\`\`\``,
        inline: true,
      },
      {
        name: locale.cfg_scale,
        value: `\`\`\`${parameter.cfg_scale}\`\`\``,
        inline: true,
      },
      {
        name: locale.size,
        value: `\`\`\`${parameter.width}x${parameter.height}\`\`\``,
        inline: true,
      },
      {
        name: locale.batch_size,
        value: `\`\`\`${parameter.batch_size}\`\`\``,
        inline: true,
      },
      {
        name: locale.n_iter,
        value: `\`\`\`${parameter.n_iter}\`\`\``,
        inline: true,
      },
      {
        name: locale.seed,
        value: `\`\`\`${parameter.seed}\`\`\``,
        inline: true,
      }
    ),
};

export default RequestEmbed;
