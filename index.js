const akaneko = require('akaneko');

const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require("./config.json");

const { loadCommands } = require("./utils/loadCommands");
const DisTube = require("distube");

client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true
});
client.distube
  .on("playSong", (message, queue, song) =>
    message.channel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    )
  )
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  );

require("./utils/loadEvents")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

loadCommands(client);

client.login(config.TOKEN);

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const client2 = new CommandoClient({
	commandPrefix: '.',
	owner: '375992650429628416'
});
client2.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'NSFW Commands'],
		['second', 'Music Player Commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commandss'));
client2.once('ready', () => {
	console.log(`Logged in as ${client2.user.tag}! (${client2.user.id})`);
});

client2.on('error', console.error);
client2.login(config.TOKEN);
  