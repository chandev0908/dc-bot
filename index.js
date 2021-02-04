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
  .on("playSong", (message, queue, song) =>{
    const playSongEmbed = new discord.MessageEmbed()
      .setColor('#0099ff')
      .setDescription(`Playing ${song.name}\nDuration ${song.formattedDuration}\nRequested by: ${song.user}`)
    message.channel.send(playSongEmbed)
  })
  .on("addSong", (message, queue, song) =>{
    const addSongEmbed = new discord.MessageEmbed()
      .setColor('#0099ff')
      .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    message.channel.send(addSongEmbed)
  });

require("./utils/loadEvents")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

loadCommands(client);

client.login(config.TOKEN);
