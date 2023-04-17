class Command {
  constructor(bot, options) {
    this.bot = bot;
    this.name = options.name;
    this.aliases = options.aliases;
    this.options = options.options;
    this.category = options.category;
    this.description = options.description;
    this.cooldown = options.cooldown;
    this.userPermissions = options.userPermissions;
    this.botPermissions = options.botPermissions;
    this.subCommands = options.subCommands;
  }
}
module.exports = Command;
