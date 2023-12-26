import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  User,
} from "discord.js";
import DeleteButton from "../components/buttons/delete.button.ts";
import RequestAdjustButton from "../components/buttons/requestAdjust.button.ts";
import RequestGenerateAgainButton from "../components/buttons/requestGenerateAgain.button.ts";
import RequestInpaintButton from "../components/buttons/requestInpaint.button.ts";
import { LocaleData, f } from "../i18n.ts";
import { Builder } from "../types/type.js";

interface IRequestResultBuilder extends Builder {
  build(locale: LocaleData, user: User, images: string[]): any;
}

const RequestResultBuilder: IRequestResultBuilder = {
  name: "requestResult",
  build: (locale: LocaleData, user: User, images: string[]) => {
    const lang = locale._key;
    return {
      files: images.map(
        (image) => new AttachmentBuilder(Buffer.from(image, "base64"))
      ),
      components: [
        new ActionRowBuilder<ButtonBuilder>({
          components: [
            RequestGenerateAgainButton.static[lang],
            RequestInpaintButton.static[lang],
            RequestAdjustButton.static[lang],
            DeleteButton.static[lang],
          ],
        }),
      ],
      embeds: [],
      content: f(locale.done, { user: `<@${user.id}>` }),
    };
  },
};

export default RequestResultBuilder;
