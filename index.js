const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const config = require("./config.json");

const { loadCommands } = require("./utils/loadCommands");
const DisTube = require("distube");

client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});
client.distube
  .on("playSong", (message, queue, song) => {
    const playSongEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription(
        `Playing ${song.name}\nDuration ${song.formattedDuration}\nRequested by: ${song.user}`
      );
    message.channel.send(playSongEmbed).then(async function (message) {
      await message.react("🛑");
      await message.react("⏭️");

      const filter = (reaction, user) => {
        return (
          ["🛑", "⏭️"].includes(reaction.emoji.name) && user.id === user.id
        );
      };
      const collector = message.createReactionCollector(filter, {time:180000});

      collector.on("collect", (reaction, user) => {
        async function collect() {
          let queue = await client.distube.getQueue(message);
          if (!user.bot) {
            if (reaction.emoji.name === "🛑") {
              if(queue){
                client.distube.stop(message);
                message.reactions.removeAll()
              }else{
                return
              }
            } else if (reaction.emoji.name === "⏭️") {
              if(queue){
                client.distube.skip(message);
                message.reactions.removeAll()
              }else{
                return
              }
            }
            reaction.users.remove(user.id);
          }
        }
        collect();
      });
      collector.on("end", (collectod, reason) => {
        async function collect() {
          if(reason === 'time'){
            message.reactions.removeAll()
          }
        }
        collect();
      });
    });
  })
  .on("addSong", (message, queue, song) => {
    const addSongEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
      );
    message.channel.send(addSongEmbed);
  })
  .on("empty", (message) =>
    message.channel.send("Channel is empty. Leaving the channel")
  );

require("./utils/loadEvents")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

loadCommands(client);

client.login(config.TOKEN);
