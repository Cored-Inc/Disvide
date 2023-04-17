const BaseCommand = require("../CommandClass");
const { MessageEmbed } = require("discord.js");
const util = require("util");
const wait = util.promisify(setTimeout);

class PingCommand extends BaseCommand {
  constructor(bot) {
    super(bot, {
      name: "ping",
      aliases: [],
      description: "Shows Cored's latency",
      category: "Information",
      cooldown: 5,
      userPermissions: [],
      botPermissions: [],
      subCommands: [],
    });
  }

  async execute(interaction) {
    const User = interaction.user;
    const PingEmbed = new MessageEmbed()
      .setColor("RED")
      .setAuthor({
        name: User.username,
        iconURL: User.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      .setTitle(`${this.bot.user.username}'s Ping`).setDescription(`
                    **Ping:** \`${Math.round(this.bot.ws.ping).toString()}ms\`
                `);
    await interaction.deferReply();
    wait(500);
    await interaction.editReply({ embeds: [PingEmbed] });
  }
}

module.exports = PingCommand;
