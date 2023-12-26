import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import CloseButton from "../components/buttons/close.button.ts";
import HomeButton from "../components/buttons/home.button.ts";
import RequestConfirmButton from "../components/buttons/requestConfirm.button.ts";
import RequestSetting1Button from "../components/buttons/requestSetting1.button.ts";
import RequestSetting2Button from "../components/buttons/requestSetting2.button.ts";
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
          RequestSetting1Button.static[lang],
          RequestSetting2Button.static[lang],
        ],
      }),
      new ActionRowBuilder<ButtonBuilder>({
        components: [
          RequestConfirmButton.static[lang],
          HomeButton.static[lang],
          CloseButton.static[lang],
        ],
      }),
    ];
  },
  prebuild: true,
};

export default RequestComponentsBuilder;
