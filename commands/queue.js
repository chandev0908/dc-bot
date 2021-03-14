const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
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
          )
        embeds.push(embed);
      }
      //returning the Embed
      return embeds;
    } catch (error) {
      console.error;
    }
  }
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );
  function embedbuilder(client, message, color, title, description, thumbnail) {
    try {
      let embed = new Discord.MessageEmbed()
        .setColor(color)
      if (title) embed.setTitle(title);
      if (description) embed.setDescription(description);
      if (thumbnail) embed.setThumbnail(thumbnail);
      return message.channel.send(embed);
    } catch (error) {
      console.error;
    }
  }
  let currentPage = 0;
  let queue = client.distube.getQueue(message);
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
  const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
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
};

module.exports.config = {
  name: "queue",
  aliases: ["q"],
};
