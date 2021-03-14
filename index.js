const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const config = require("./config");

const { loadCommands } = require("./utils/loadCommands");
const DisTube = require("distube");

client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});
client.on('message', (message) => {
  if (!message.content.startsWith(".")) return;
  const args = message.content.slice(".".length).trim().split(/ +/g);
  const command = args.shift();
  if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
      let filter = client.distube.setFilter(message, command);
      message.channel.send("Current queue filter: " + (filter || "Off"));
  }
});

async function embedder(client, message, title, description, thumbnail) {
  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(title)
    .setDescription(description)
    .setFooter(
      message.author.tag,
      message.member.user.displayAvatarURL({ dynamic: true })
    );
  if (thumbnail) embed.setThumbnail(thumbnail);
  var run = await message.channel.send(embed);
}
client.distube
  .on("playSong", (message, queue, song) => {
    playsongyes(message, queue, song);
  })
  .on("addSong", (message, queue, song) => {
    const addSongEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
      );
    message.channel.send(addSongEmbed);
  })
  .on("playList", (message, queue, playlist, song) => {
    const addPlaylistEmbed = new Discord.MessageEmbed()
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
    message.channel.send("An error encountered: " + err)
  )

  .on("finish", (message) => message.channel.send("No more song in queue"))

  .on("addList", (message, queue, playlist) =>
    message.channel.send(
      `Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  );

require("./utils/loadEvents")(client);

//this function is for playing the song
async function playsongyes(message, queue, song) {
  try {
    let isPaused = await client.distube.isPaused(message);
    let embed1 = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(isPaused ? "Paused" : "Now Playing")
      .setDescription(
        `Playing ${song.name}\nDuration: **${
          song.formattedDuration
        }**\nDuration ${queue.formattedCurrentTime} / ${song.formattedDuration}\nRequested by: ${
          song.user
        }\nAutoplay: ${queue.autoplay ? "✅" : "❌"}\nVolume: ${
          queue.volume
        }%\n Loop: ${
          queue.repeatMode
            ? queue.repeatMode === 2
              ? "✅ Queue"
              : "✅ Song"
            : "Off"
        }\nFilter: ${queue.filter || "❌"}`
      )
      .setFooter(
        message.author.tag,
        message.member.user.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(song.thumbnail);
    var playingMessage = await message.channel.send(embed1);
    try {
      await playingMessage.react("⏭");
      await playingMessage.react("⏯️");
      await playingMessage.react("⏹");
      await playingMessage.react("◀️");
      await playingMessage.react("▶️");
      await playingMessage.react("🔉");
      await playingMessage.react("🔊");
      await playingMessage.react("🔁");
      await playingMessage.react("🎵");
    } catch (error) {
      message.reply("Missing permissions, i need to add reactions!");
      console.log(error);
    }

    const filter = (reaction, user) =>
      ["⏭", "⏹", "⏯️", "🔉", "🔊", "◀️", "▶️", "🔁", "🎵"].includes(
        reaction.emoji.name
      ) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: song.duration > 0 ? song.duration * 1000 : 600000,
    });
    collector.on("collect", async (reaction, user) => {
      let isPaused = await client.distube.isPaused(message);
      let queue = await client.distube.getQueue(message);
      if (!queue) return;
      const member = message.guild.member(user);
      if (
        member.voice.connection &&
        member.voice.connection !== member.guild.me.voice.connection
      )
        return;

      switch (reaction.emoji.name) {
        case "⏭":
          client.distube.skip(message);
          embedbuilder(
            client,
            message,
            "#0099ff8",
            "SKIPPED!",
            `Skipped the song`
          ).then((message) =>
            message.delete({ timeout: 3000 }).catch(console.error)
          );
          playingMessage.reactions.removeAll().catch(console.error);
          break;

        case "⏹":
          client.distube.stop(message);
          const stopEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("STOPPED")
            .setDescription("Thanks for using the bot bye! byee!👋");
          message.channel.send(stopEmbed);
          playingMessage.reactions.removeAll().catch(console.error);
          break;

        case "🔉":
          reaction.users.remove(user).catch(console.error);
          await client.distube.setVolume(message, Number(queue.volume) - 10);
          embedbuilder(
            client,
            message,
            "#0099ff",
            "Volume!",
            `Redused the Volume to \`${queue.volume}\``
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "🔊":
          reaction.users.remove(user).catch(console.error);
          await client.distube.setVolume(message, Number(queue.volume) + 10);
          embedbuilder(
            client,
            message,
            "#0099ff",
            "Volume!",
            `Raised the Volume to \`${queue.volume}\``
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));
          await playingMessage.edit(curembed(message)).catch(console.error);
          break;

        case "◀️":
          reaction.users.remove(user).catch(console.error);
          let seektime = queue.currentTime - 10000;
          if (seektime < 0) seektime = 0;
          await client.distube.seek(message, Number(seektime));
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(
            client,
            message,
            "#0099ff",
            "Seeked!",
            `Seeked the song for \`-10 seconds\``
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));

          break;

        case "▶️":
          reaction.users.remove(user).catch(console.error);
          let seektime2 = queue.currentTime + 10000;
          if (seektime2 >= queue.songs[0].duration * 1000) {
            seektime2 = queue.songs[0].duration * 1000 - 1;
          }
          console.log(seektime2);
          await client.distube.seek(message, seektime2);
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(
            client,
            message,
            "#0099ff",
            "Seeked!",
            `Seeked the song for \`+10 seconds\``
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));
          break;
        case "⏯️":
          reaction.users.remove(user).catch(console.error);
          if (isPaused) {
            client.distube.resume(message, queue);
          } else if (!isPaused) {
            client.distube.pause(message, queue);
          }
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(
            client,
            message,
            "#0099ff",
            isPaused ? "Resume" : "Paused",
            `The music was ${isPaused ? "resume" : "paused"}`
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));
          break;
        case "🎵":
          reaction.users.remove(user).catch(console.error);
          let currentPage = 0;
          if (!queue)
            return embedbuilder(
              client,
              message,
              "RED",
              "There is nothing playing!"
            ).then((msg) => msg.delete({ timeout: 5000 }).catch(console.error));

          const embeds = QueueEmbed(queue.songs);
          const queueEmbed = await message.channel.send(
            `
      **Current Page - ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]
          );
          try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
          } catch (error) {
            console.error(error);
          }
          const filter = (reaction, user) =>
            ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) &&
            message.author.id === user.id;
          const collector = queueEmbed.createReactionCollector(filter, {
            time: 60000,
          });
          collector.on("collect", async (reaction, user) => {
            try {
              if (reaction.emoji.name === "➡️") {
                if (currentPage < embeds.length - 1) {
                  currentPage++;
                  queueEmbed.edit(
                    `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                    embeds[currentPage]
                  );
                }
              } else if (reaction.emoji.name === "⬅️") {
                if (currentPage !== 0) {
                  --currentPage;
                  queueEmbed.edit(
                    `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                    embeds[currentPage]
                  );
                }
              } else {
                collector.stop();
                reaction.message.reactions.removeAll();
              }
              await reaction.users.remove(message.author.id);
            } catch (error) {
              console.error(error);
            }
          });
          break;

        case "🔁":
          reaction.users.remove(user).catch(console.error);
          client.distube.setRepeatMode(message);
          playingMessage.edit(curembed(message)).catch(console.error);
          embedbuilder(
            client,
            message,
            "#0099ff",
            `Loop ${
              queue.repeatMode
                ? queue.repeatMode === 2
                  ? "✅ Queue"
                  : "✅ Song"
                : "Off"
            }`,
            `Loop: ${
              queue.repeatMode
                ? queue.repeatMode === 2
                  ? "✅ Queue"
                  : "✅ Song"
                : "Off"
            }`
          ).then((msg) => msg.delete({ timeout: 3000 }).catch(console.error));
          break;
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });
    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
    });
  } catch (error) {
    console.log(error);
  }
}
//this function is for embed editing for the music info msg
function curembed(message) {
  try {
    let isPaused = client.distube.isPaused(message);
    let queue = client.distube.getQueue(message); //get the current queue
    let song = queue.songs[0];
    embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(isPaused ? "Paused" : "Now Playing")
      .setDescription(
        `Playing ${song.name}\nDuration: **${
          song.formattedDuration
        }**\nDuration ${queue.formattedCurrentTime} / ${song.formattedDuration}\nRequested by: ${song.user}\nAutoplay: ${
          queue.autoplay ? "✅" : "❌"
        }\nVolume: ${queue.volume}%\n Loop: ${
          queue.repeatMode
            ? queue.repeatMode === 2
              ? "✅ Queue"
              : "✅ Song"
            : "Off"
        }\nFilter: ${queue.filter || "❌"}`
      )
      .setFooter(
        message.author.tag,
        message.member.user.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(song.thumbnail);
    return embed; //sending the new embed back
  } catch (error) {
    console.error;
  }
}

//function embeds creates embeds
function embedbuilder(client, message, color, title, description, thumbnail) {
  try {
    let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor(
        message.author.tag,
        message.member.user.displayAvatarURL({ dynamic: true }),
        "https://musicium.eu"
      )
      .setFooter(
        message.author.tag,
        message.member.user.displayAvatarURL({ dynamic: true })
      );
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail);
    return message.channel.send(embed);
  } catch (error) {
    console.error;
  }
}
// For queue
function QueueEmbed(queue) {
  try {
    let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k);
      let j = i;
      k += 10;
      const info = current
        .map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`)
        .join("\n");
      const embed = new Discord.MessageEmbed()
        .setTitle("Queue")
        .setColor("#0099ff")
        .setDescription(
          `**Playing - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`
        );
      embeds.push(embed);
    }
    //returning the Embed
    return embeds;
  } catch (error) {
    console.error;
  }
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Discord.Collection();

loadCommands(client);

client.login(process.env.TOKEN);

function embed69(description) {
  const reminderEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Class Schedule Reminder!")
    .setDescription(description);
  return client.channels.cache
    .get(process.env.SERVER_CHANNEL_ID_GENERAL)
    .send(reminderEmbed);
}
//Subject Reminder for weebus
const cron = require("cron");
let roleId = "815852692902510603";
//Schedule for CC3 every tuesday & thursday
let scheduleInCC3 = new cron.CronJob(
  "55 6 * * 2,4",
  () => {
    embed69(`In 5mins your class will start in CC3. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInCC3Now = new cron.CronJob(
  "00 7 * * 2,4",
  () => {
    embed69(`Join to your class call now in CC3. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for SocSci/Rizal
let scheduleInRizal = new cron.CronJob(
  "25 8 * * 3,5",
  () => {
    embed69(
      `In 5mins your class will start in Rizal. Goodluck pray for your life <@&${roleId}>`
    );
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInRizalNow = new cron.CronJob(
  "30 8 * * 3,5",
  () => {
    embed69(`Join to your class call now in Rizal. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for PSY
let scheduleInPsy = new cron.CronJob(
  "55 9 * * 3,5",
  () => {
    embed69(`In 5mins your class will start in Psy. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInPsyNow = new cron.CronJob(
  "00 10 * * 3,5",
  () => {
    embed69(`Join to your class call now in Psy. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for PE
let scheduleInPE = new cron.CronJob(
  "55 9 * * 4",
  () => {
    embed69(`In 5mins your class will start in PE. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInPENow = new cron.CronJob(
  "00 10 * * 4",
  () => {
    embed69(`Join to your class call now in PE. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for HCI
let scheduleInHCI = new cron.CronJob(
  "55 12 * * 2,4",
  () => {
    embed69(`In 5mins your class will start in HCI. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInHCINow = new cron.CronJob(
  "00 13 * * 2,4",
  () => {
    embed69(`Join to your class call now in HCI. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for Publc Speaking/GE ELECT
let scheduleInPS = new cron.CronJob(
  "55 12 * * 3,5",
  () => {
    embed69(`In 5mins your class will start in Public Speaking.<@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInPSNow = new cron.CronJob(
  "00 13 * * 3,5",
  () => {
    embed69(`Join to your class call now in Public Speaking.<@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for MATH
let scheduleInMath = new cron.CronJob(
  "25 14 * * 2,4",
  () => {
    embed69(`In 5mins your class will start in Math. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInMathNow = new cron.CronJob(
  "30 14 * * 2,4",
  () => {
    embed69(`Join to your class call now in Math. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
//Schedule for NSTP
let scheduleInNSTP = new cron.CronJob(
  "25 14 * * 3,5",
  () => {
    embed69(`In 5mins your class will start in NSTP. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
let scheduleInNSTPNow = new cron.CronJob(
  "30 14 * * 3,5",
  () => {
    embed69(`Join to your class call now in NSTP. <@&${roleId}>`);
  },
  undefined,
  true,
  "Asia/Singapore"
);
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
