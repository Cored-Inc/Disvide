import Discord from 'discord.js';

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('your-bot-token');