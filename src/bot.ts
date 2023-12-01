import {
  Client,
  ClientEvents,
  Collection,
  Component as DiscordComponent,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
} from "discord.js";
import { i18n } from "./i18n.ts";
import logger, { fatal } from "./logger.ts";
import {
  BotConfig,
  Builder,
  Command,
  Component,
  Embed,
  IBuildable,
} from "./types/type.ts";
import { walkDir } from "./utils.ts";

export const prebuild = (
  buildable: IBuildable<DiscordComponent | EmbedBuilder>
) => {
  if (!buildable.prebuild) return;
  buildable.static = {};
  for (const lang of Object.keys(i18n)) {
    buildable.static[lang] = buildable.build(i18n[lang]);
    if (buildable.static[lang].toJSON)
      buildable.static[lang] = buildable.static[lang].toJSON();
  }
};

export class BotClient extends Client {
  // Variablessd
  private _: BotConfig;

  // Commands
  public commands: Collection<String, Command>;
  public commandArray: Array<any>;

  // Components
  public components: Collection<String, Component<any>>;

  // Embeds
  public embeds: Collection<String, Embed>;

  // Builders
  public builders: Collection<String, Builder>;

  constructor(options: BotConfig) {
    super(options);
    this._ = options;
    this.init();
  }

  /**
   * Initialize Variables
   */
  private init(): void {
    if (!this._.token) fatal("Bot client token should not be empty");
    this._.timeout = this._.timeout || 5000;
    // Commands
    this.commands = new Collection<String, Command>();
    this.commandArray = [];

    // Components
    this.components = new Collection<String, Component<any>>();

    // Components
    this.embeds = new Collection<String, Embed>();

    // Builders
    this.builders = new Collection<String, Builder>();
  }

  private registerComponent(component: Component<any>) {
    if (this.components.get(component.name))
      return logger.error(
        `The component name=${component.name} have already been registered.`
      );
    if (component.prebuild) prebuild(component);
    this.components.set(component.name, component);
  }

  private registerEmbed(embed: Embed) {
    if (this.embeds.get(embed.name))
      return logger.error(
        `The embed name=${embed.name} have already been registered.`
      );
    if (embed.prebuild) prebuild(embed);
    this.embeds.set(embed.name, embed);
  }

  private registerBuilder(builder: Builder) {
    if (this.builders.get(builder.name))
      return logger.error(
        `The builder name=${builder.name} have already been registered.`
      );
    if (builder.prebuild) prebuild(builder);
    this.builders.set(builder.name, builder);
  }

  private registerCommand(command: Command) {
    if (this.commands.get(command.name))
      return logger.error(
        `The command name=${command.name} have already been registered.`
      );
    this.commands.set(command.name, command);
    this.commandArray.push(command.command.toJSON());
  }

  private registerEvent(once: Boolean, name: keyof ClientEvents, execute: any) {
    once ? this.once(name, execute) : this.on(name, execute);
  }

  // Module Handler
  public async loadModules(): Promise<void> {
    await this.loadComponents();
    await this.loadEmbeds();
    await this.loadBuilders();
    await this.loadCommands();
    await this.loadEvents();
  }

  private async loadComponents(): Promise<void> {
    for (const file of walkDir("./src/components", (file) =>
      file.endsWith(".ts")
    )) {
      logger.info(`Load Component: ${file}`);
      const component: Component<any> = (await import(`./components/${file}`))
        .default;
      this.registerComponent(component);
    }
    logger.info(`Load Components Complete`);
  }

  private async loadEmbeds(): Promise<void> {
    for (const file of walkDir("./src/embeds", (file) =>
      file.endsWith(".ts")
    )) {
      logger.info(`Load Embed: ${file}`);
      const embed: Embed = (await import(`./embeds/${file}`)).default;
      this.registerEmbed(embed);
    }
    logger.info(`Load Embeds Complete`);
  }

  private async loadBuilders(): Promise<void> {
    for (const file of walkDir("./src/builders", (file) =>
      file.endsWith(".ts")
    )) {
      logger.info(`Load Builder: ${file}`);
      const builder: Builder = (await import(`./builders/${file}`)).default;
      this.registerBuilder(builder);
    }
    logger.info(`Load Builder Complete`);
  }

  private async loadCommands(): Promise<void> {
    for (const file of walkDir("./src/commands", (file) =>
      file.endsWith(".ts")
    )) {
      logger.info(`Load Command: ${file}`);
      const command: Command = (await import(`./commands/${file}`)).default;
      this.registerCommand(command);
    }

    logger.info(`Load Commands Complete`);

    await new REST({ version: "10" })
      .setToken(this._.token)
      .put(Routes.applicationCommands(this._.clientId), {
        body: this.commandArray,
      })
      .then(() => logger.info("Register Commands Complete"))
      .catch((err) => logger.error(err));
  }

  private async loadEvents(): Promise<void> {
    for (const file of walkDir("./src/events", (file) =>
      file.endsWith(".ts")
    )) {
      logger.info(`Load Event: ${file}`);
      const { once, name, execute } = (await import(`./events/${file}`))
        .default;
      this.registerEvent(once, name, execute);
    }

    logger.info(`Load Events Complete`);
  }

  public async run(): Promise<void> {
    await this.login(this._.token).then(() => {
      setTimeout(() => {
        const restart = () => this.run();
        if (!this.isReady()) {
          logger.error("Bot is not resady. Restarting bot...");
          restart();
        }
      }, this._.timeout);
    });
  }
}

const bot = new BotClient({
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

export default bot;
