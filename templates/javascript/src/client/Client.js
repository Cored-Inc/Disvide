const { Client } = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const config = require("../../config.json");
const BaseCommand = require("../commands/CommandClass");

class Bot extends Client {
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

  loadCommands(dir = join(__dirname, "../commands")) {
    readdirSync(dir)
      .filter((f) => !f.endsWith(".js"))
      .forEach((dirs) => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
          files.endsWith(".js")
        );
        for (const file of commands) {
          const importFile = require(`${dir}/${dirs}/${file}`);
          if (importFile.prototype instanceof BaseCommand) {
            const command = new importFile(this);
            this.commands.set(command.name, command);
            console.log(`Command loaded: ${command.name}`);
          }
        }
      });
  }

  loadEvents(dir = join(__dirname, "../events")) {
    readdirSync(dir).forEach((file) => {
      const getFile = require(`${dir}/${file}`);
      const evt = new getFile(this);
      const evtName = file.split(".")[0];
      this.on(evtName, (...args) => evt.run(...args));
      console.log(`Event loaded: ${evtName}`);
    });
  }
}

module.exports = Bot;
