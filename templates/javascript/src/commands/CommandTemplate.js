const Command = require("./CommandClass");

class CommandTemplate extends Command {
  constructor(bot) {
    super(bot, {
      name: "NAME",
      aliases: [],
      args: [
        {
          name: "NAME_ARG",
          description: "DESCRIPTION_ARG",
          type: "STRING",
          required: true,
        },
      ],
      description: "DESCRIPTION",
      category: "CATEGORY",
      cooldown: 5,
      userPermissions: [],
      botPermissions: [],
      subCommands: [],
    });
  }

  async execute(interaction, args) {
    console.log(interaction);
    console.log(args);
  }
}

module.exports = CommandTemplate