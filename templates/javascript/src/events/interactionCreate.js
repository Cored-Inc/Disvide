module.exports = class {
  constructor(bot) {
    this.bot = bot;
  }

  async run(interaction) {
    if (!interaction.isCommand()) return;
    let member = interaction.guild.members.cache.get(interaction.user.id);
    if (!member)
      member = await interaction.guild.members.fetch(interaction.user.id);
    /* -----------------COMMAND----------------- */
    const command = this.bot.commands.get(interaction.commandName);
    if (!command) return;

    if (command.userPermissions.includes("BOT_ADMIN")) {
      return interaction.replyErrorMessage(
        `You don't have permissions for use this command.`
      );
    }
    if (command.userPermissions.length) {
      for (const permission of command.userPermissions) {
        if (
          !interaction.guild?.members.cache
            .get(interaction.user.id)
            .permissions.has(permission)
        )
          return interaction.replyErrorMessage(
            `You need the \`${command.userPermissions
              .map((command) =>
                command
                  .split("_")
                  .map((x) => x[0] + x.slice(1).toLowerCase())
                  .join(" ")
              )
              .join(", ")}\` permission(s) for use this command.`
          );
      }
    }
    if (command.botPermissions.length) {
      for (const permission of command.botPermissions) {
        if (
          interaction.guild?.members.cache
            .get(this.bot.user.id)
            .permissions.has(permission)
        )
          return interaction.replyErrorMessage(
            `I need the \`${command.botPermissions
              .map((command) =>
                command
                  .split("_")
                  .map((x) => x[0] + x.slice(1).toLowerCase())
                  .join(" ")
              )
              .join(", ")}!interaction.guild!.me!.permissions.has(permission))
          `
          );
      }
    }

    if (!this.bot.cooldowns.has(command.name)) {
      this.bot.cooldowns.set(command.name, new Map());
    }

    const timeNow = Date.now();
    const tStamps = this.bot.cooldowns.get(command.name);
    const cdAmount = (command.cooldown || 5) * 1000;
    if (tStamps.has(interaction.user.id)) {
      const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;
      if (timeNow < cdExpirationTime) {
        const timeLeft = (cdExpirationTime - timeNow) / 1000;
        return interaction.replyErrorMessage(
          `Please wait ${timeLeft.toFixed(
            0
          )} second(s) before using the command \`${command.name}\` again .`
        );
      }
    }
    tStamps.set(interaction.user.id, timeNow);
    setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);

    /* ---------------SUB-COMMAND--------------- */
    interaction.subcommand = interaction.options.getSubcommand(false);

    /* ---------------OPTIONS--------------- */

    let args = interaction.options;

    /* ---------------COMMAND--------------- */
    try {
      await command.execute(interaction, args);
    } catch (e) {
      console.error(e);
    }
  }
};
