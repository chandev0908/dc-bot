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
  return client.channels.cache.get("805803334509527100").send(reminderEmbed);
}
//Subject Reminder for weebus
const cron = require('cron');
let roleId = "816085078320218133"
//Schedule for CC3 every tuesday & thursday
let scheduleInCC3 = new cron.CronJob('06 8 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in CC3. <@&${roleId}>`);
}, undefined, true, "Asia/Singapore");
console.log(scheduleInCC3)

//Schedule for SocSci/Rizal
let scheduleInRizal = new cron.CronJob('25 8 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Rizal. Goodluck pray for your life <@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for PSY
let scheduleInPsy = new cron.CronJob('55 9 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Psy. <@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for PE
let scheduleInPE = new cron.CronJob('55 9 * * 4', () => {
  embedBuilder(`In 5mins you classes will start in PE. <@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for HCI
let scheduleInHCI = new cron.CronJob('55 12 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in HCI. <@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for Publc Speaking/GE ELECT
let scheduleInPS = new cron.CronJob('55 12 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in Public Speaking.<@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for MATH
let scheduleInMath = new cron.CronJob('25 14 * * 2,4', () => {
  embedBuilder(`In 5mins you classes will start in Math. <@&${roleId}>`);
}, "Asia/Singapore");
//Schedule for NSTP
let scheduleInNSTP = new cron.CronJob('25 14 * * 3,5', () => {
  embedBuilder(`In 5mins you classes will start in NSTP. <@&${roleId}>`);
}, "Asia/Singapore");
scheduleInCC3.start();
scheduleInRizal.start();
scheduleInPsy.start();
scheduleInPE.start();
scheduleInHCI.start();
scheduleInPS.start();
scheduleInMath.start();
scheduleInNSTP.start();

// Youtube notification

const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("DISCORD BOT YO");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});
const {youtubers_ID} = require("./config.json");
const YouTubeNotifier = require('youtube-notification');


client.on("ready", () => {
  console.log("Watching " + youtubers_ID.length  + " Channels")
})

const notifier = new YouTubeNotifier({
  hubCallback: 'https://sleepy-sands-66607.herokuapp.com/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});


notifier.on('notified', data => {
  console.log('New Video');
  client.channels.cache.get(process.env.SERVER_CHANNEL_ID).send(
    `**${data.channel.name}** just uploaded a new video - **${data.video.link}** @everyone`
  );
});
 
notifier.subscribe(youtubers_ID);

app.use("/yt", notifier.listener());