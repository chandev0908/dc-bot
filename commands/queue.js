const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );

  let queue = await client.distube.getQueue(message);

  if (queue) {
    client.distube.getQueue(message);
    const queueEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription(
        "Current Queue\n" +
          queue.songs
            .map(
              (song, id) =>
                `${id + 1}. [${song.name}] - ${song.formattedDuration}`
            )
            .join("\n")
      );
    message.channel.send(queueEmbed);
    setTimeout(() => {
      message.delete();
    }, 3000);
  } else if (!queue) {
    return;
  }
};

module.exports.config = {
  name: "queue",
  aliases: ["q"],
};
