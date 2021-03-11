const discord = require("discord.js");
const client = new discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const config = require("./config");

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
              const stopEmbed = new discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("STOPPED")
                .setDescription("Thanks for using the bot bye! byee!👋");
              message.channel.send(stopEmbed);
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
  )
  .on("error", (message, err) => 
    message.channel.send("An error encountered: " + err))

  .on("finish", message => message.channel.send("No more song in queue"))

  .on("addList", (message, queue, playlist) => message.channel.send(
    `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
  ));

require("./utils/loadEvents")(client);

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.cooldown = new discord.Collection();

loadCommands(client);

client.login(process.env.TOKEN);

function embedBuilder(description){
  const reminderEmbed = new discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Class Schedule Reminder!")
      .setDescription(description)
  return client.channels.cache.get(process.env.SERVER_CHANNEL_ID_GENERAL).send(reminderEmbed);
}
//Subject Reminder for weebus
const cron = require('cron');
let roleId = "815852692902510603"
//Schedule for CC3 every tuesday & thursday
let scheduleInCC3 = new cron.CronJob('55 6 * * 2,4', () => {
  embedBuilder(`In 5mins your class will start in CC3. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInCC3Now = new cron.CronJob('00 7 * * 2,4', () => {
  embedBuilder(`Join to your class call now in CC3. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for SocSci/Rizal
let scheduleInRizal = new cron.CronJob('25 8 * * 3,5', () => {
  embedBuilder(`In 5mins your class will start in Rizal. Goodluck pray for your life <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInRizalNow = new cron.CronJob('30 8 * * 3,5', () => {
  embedBuilder(`Join to your class call now in Rizal. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for PSY
let scheduleInPsy = new cron.CronJob('55 9 * * 3,5', () => {
  embedBuilder(`In 5mins your class will start in Psy. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInPsyNow = new cron.CronJob('00 10 * * 3,5', () => {
  embedBuilder(`Join to your class call now in Psy. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for PE
let scheduleInPE = new cron.CronJob('55 9 * * 4', () => {
  embedBuilder(`In 5mins your class will start in PE. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInPENow = new cron.CronJob('00 10 * * 4', () => {
  embedBuilder(`Join to your class call now in PE. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for HCI
let scheduleInHCI = new cron.CronJob('55 12 * * 2,4', () => {
  embedBuilder(`In 5mins your class will start in HCI. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInHCINow = new cron.CronJob('00 13 * * 2,4', () => {
  embedBuilder(`Join to your class call now in HCI. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for Publc Speaking/GE ELECT
let scheduleInPS = new cron.CronJob('55 12 * * 3,5', () => {
  embedBuilder(`In 5mins your class will start in Public Speaking.<@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInPSNow = new cron.CronJob('00 13 * * 3,5', () => {
  embedBuilder(`Join to your class call now in Public Speaking.<@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for MATH
let scheduleInMath = new cron.CronJob('25 14 * * 2,4', () => {
  embedBuilder(`In 5mins your class will start in Math. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInMathNow = new cron.CronJob('30 14 * * 2,4', () => {
  embedBuilder(`Join to your class call now in Math. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Schedule for NSTP
let scheduleInNSTP = new cron.CronJob('25 14 * * 3,5', () => {
  embedBuilder(`In 5mins your class will start in NSTP. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
let scheduleInNSTPNow = new cron.CronJob('30 14 * * 3,5', () => {
  embedBuilder(`Join to your class call now in NSTP. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
//Executor
scheduleInCC3.start();
scheduleInCC3Now.start();
scheduleInRizal.start();
scheduleInRizalNow.start();
scheduleInPsy.start();
scheduleInPsyNow.start();
scheduleInPE.start();
scheduleInPENow.start();
scheduleInHCI.start();
scheduleInHCINow.start();
scheduleInPS.start();
scheduleInPSNow.start();
scheduleInMath.start();
scheduleInMathNow.start();
scheduleInNSTP.start();
scheduleInNSTPNow.start();

