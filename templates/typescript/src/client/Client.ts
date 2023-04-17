import { Client } from "discord.js";
import type { IConfig } from "../typescript/interfaces";
import config from "../../config.json";
import { readdirSync } from "fs";
import { join } from "path";

export default class bot extends Client {
  public owner: string;
  public commands: Map<string, any>;
  public cooldowns: Map<string, any>;
  public token: string;
  public config: IConfig;

  constructor() {
    super({
      // Dangerous, change when not in development
      intents: 32767,
    });
    this.config = config;
    this.commands = new Map();
    this.cooldowns = new Map();
    this.loadCommands();
    this.loadEvents();
    this.login(this.config.bot_token);
  }

  private async loadCommands(dir = join(__dirname, "../commands")) {
    readdirSync(dir)
      .filter((f) => !f.endsWith(".ts"))
      .forEach(async (dirs) => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
          files.endsWith(".ts")
        );
        for (const file of commands) {
          const importFile = await import(`${dir}/${dirs}/${file}`);
          const CommandClass = importFile.default;
          const command = new CommandClass(this);
          this.commands.set(command.name, command);
          console.log(`Command loaded: ${command.name}`);
        }
      });
  }

  private async loadEvents(dir = join(__dirname, "../events")) {
    readdirSync(dir).forEach(async (file) => {
      const getFile = await import(`${dir}/${file}`).then((e) => e.default);
      const evt = new getFile(this);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => evt.run(...args));
      console.log(`Event loaded: ${evtName}`);
    });
  }
}
