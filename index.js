const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const akaneko = require('akaneko');

app.get("/", (request, response) => {
  console.log("Ping");
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Zin Bot");
});

const listener = server.listen(process.env.PORT, () =>
  console.log(`Your app is listening on port ` + listener.address().port)
);

const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const config = require("./config.json");

const YTNotifier = require("youtube-notification");

client.on("ready", () => {
  console.log("Watching " + config.CHANNEL_ID.length + " Channels");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "https://github.com/chandev0908/discordBot",
      type: "PLAYING"
    }
  });
});

const notifier = new YTNotifier({
  hubCallback: "https://transparent-garnet-theater.glitch.me/yt",
  secret: "WEEBUS_BOT"
});

notifier.on("notified", data => {
  console.log("New Video");
  client.channels.cache.get(config.SERVER_CHANNEL_ID).send(
      `**${data.channel.name}** new video - **${data.video.link} @everyone**`
    );
});

notifier.subscribe(config.CHANNEL_ID);

app.use("/yt", notifier.listener());

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
  