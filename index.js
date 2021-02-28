const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const config = require("./config");

const { loadCommands } = require("./utils/loadCommands");
const DisTube = require("distube");
const e = require("express");

client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});
client.distube
  .on("playSong", (message, queue, song) => {
    const playSongEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`Now Playing!`)
      .setDescription(
        `Playing ${song.name}\nDuration: **${song.formattedDuration}**\nRequested by: ${song.user}\nAutoplay ${queue.autoplay ? "✅" : "❌"}`
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
          if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection)
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

function embedBuilder(description){
  const reminderEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Class Schedule Reminder!")
      .setDescription(description)
  return client.channels.cache.get(process.env.SERVER_CHANNEL_ID).send(reminderEmbed);
}
//Subject Reminder for weebus
const cron = require('cron');
const server = require("youtube-notification/src/server");
//Schedule for CC3 every tuesday & thursday
let scheduleInCC3 = new cron.CronJob('55 6 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in CC3. @everyone`);
}, "Asia/Singapore");
//Schedule for SocSci/Rizal
let scheduleInRizal = new cron.CronJob('25 8 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Rizal. Goodluck pray for your life @everyone`);
}, "Asia/Singapore");
//Schedule for PSY
let scheduleInPsy = new cron.CronJob('55 9 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Psy. @everyone`);
}, "Asia/Singapore");
//Schedule for PE
let scheduleInPE = new cron.CronJob('55 9 * * 4', () => {
  embedBuilder(`In 5mins you classes will start in PE. @everyone`);
}, "Asia/Singapore");
//Schedule for HCI
let scheduleInHCI = new cron.CronJob('55 12 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in HCI. @everyone`);
}, "Asia/Singapore");
//Schedule for Publc Speaking/GE ELECT
let scheduleInPS = new cron.CronJob('55 12 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Public Speaking. @everyone`);
}, "Asia/Singapore");
//Schedule for MATH
let scheduleInMath = new cron.CronJob('25 14 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in Math. @everyone`);
}, "Asia/Singapore");
//Schedule for NSTP
let scheduleInNSTP = new cron.CronJob('25 14 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in NSTP. @everyone`);
}, "Asia/Singapore");
scheduleInCC3.start();
scheduleInRizal.start();
scheduleInPsy.start();
scheduleInPE.start();
scheduleInHCI.start();
scheduleInPS.start();
scheduleInMath.start();
scheduleInNSTP.start();