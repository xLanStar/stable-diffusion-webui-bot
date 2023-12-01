import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import CloseButton from "../components/buttons/close.button.ts";
import HomeButton from "../components/buttons/home.button.ts";
import Txt2imgConfirmButton from "../components/buttons/txt2imgConfirm.button.ts";
import Txt2imgSetting1Button from "../components/buttons/txt2imgSetting1.button.ts";
import Txt2imgSetting2Button from "../components/buttons/txt2imgSetting2.button.ts";
import SamplerMenu from "../components/selectMenus/sampler.menu.ts";
import { LocaleData } from "../i18n.ts";
import { Builder } from "../types/type.js";

interface IRequestComponentsBuilder extends Builder {
  build(locale: LocaleData): any;
}

const RequestComponentsBuilder: IRequestComponentsBuilder = {
  name: "requestComponents",
  build: (locale: LocaleData) => {
    const lang = locale._key;
    return [
      new ActionRowBuilder<StringSelectMenuBuilder>({
        components: [SamplerMenu.static[lang]],
      }),
      new ActionRowBuilder<ButtonBuilder>({
        components: [
          Txt2imgSetting1Button.static[lang],
          Txt2imgSetting2Button.static[lang],
        ],
      }),
      new ActionRowBuilder<ButtonBuilder>({
        components: [
          Txt2imgConfirmButton.static[lang],
          HomeButton.static[lang],
          CloseButton.static[lang],
        ],
      }),
    ];
  },
  prebuild: true,
};

export default RequestComponentsBuilder;
