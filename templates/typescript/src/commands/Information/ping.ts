import Command from "../CommandClass";
import type {
  ICommandInteraction,
} from "../../typescript/interfaces";
import { MessageEmbed } from "discord.js";
import util from "util";
const wait = util.promisify(setTimeout);

export default class extends Command {
  constructor(bot: any) {
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

  async execute(interaction: ICommandInteraction) {
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
