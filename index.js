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
    let mode = client.distube.toggleAutoplay(message);
    const playSongEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Now Playing!`)
      .setDescription(
        `Playing ${song.name}\nDuration: **${song.formattedDuration}**\nRequested by: ${song.user}\nAutoplay ${mode ? "❌" : "✅"}`
      )
      .setThumbnail(song.thumbnail)
    message.channel.send(playSongEmbed).then(async function (message) {
      await message.react("⏹");
      await message.react("⏯️")
      await message.react("⏭️");

      const filter = (reaction, user) => {
        return ["⏹", "⏭️", "⏯️"].includes(reaction.emoji.name) && user.id === user.id;
      };
      const collector = message.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000,
      });

      collector.on("collect", (reaction, user) => {
        async function collect() {
          if (!queue) return;
          const member = message.guild.member(user);
          if (member.voice.connection &&member.voice.connection !== member.guild.me.voice.connection)
            return;
          let isPaused = await client.distube.isPaused(message);
          switch (reaction.emoji.name) {
            case "⏹":
              client.distube.stop(message);
              message.reactions.removeAll();
              break;
            case "⏭️":
              client.distube.skip(message);
              message.reactions.removeAll();
              break;
            case "⏯️":
              if(isPaused){
                client.distube.resume(message, queue);
              }else if(!isPaused){
                client.distube.pause(message, queue);
              }
          }
          reaction.users.remove(user.id);
          // let queue = await client.distube.getQueue(message);
          // if (!user.bot) {
          //   if (reaction.emoji.name === "🛑") {
          //     if (queue) {
          //       client.distube.stop(message);
          //       message.reactions.removeAll();
          //     } else {
          //       return;
          //     }
          //   } else if (reaction.emoji.name === "⏭️") {
          //     if (queue) {
          //       client.distube.skip(message);
          //       message.reactions.removeAll();
          //     } else {
          //       return;
          //     }
          //   } else if (reaction.emoji.name === "⏯️") {
          //     if (queue) {

          //     } else {
          //       return;
          //     }
          //   }
          //   reaction.users.remove(user.id);
          // }
        }
        collect();
      });
      collector.on("end", (collectod, reason) => {
        async function collect() {
          if (reason === "time") {
            message.reactions.removeAll();
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
  .on("playList", (message, queue, playlist, song) => {
    const addPlaylistEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription(
        `Play **${playlist.name}** \nThe playlist length is **${playlist.songs.length}**\nRequested by: ${song.user}\nNow playing **${song.name}** - **${song.formattedDuration}**`
      );
    message.channel.send(addPlaylistEmbed);
  })
  .on("empty", (message) =>
    message.channel.send("Channel is empty. Leaving the channel")
  );

require("./utils/loadEvents")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

loadCommands(client);

client.login(process.env.TOKEN);
