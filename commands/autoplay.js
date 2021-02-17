const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );

  let queue = await client.distube.getQueue(message);
  if (queue) {
    let mode = client.distube.toggleAutoplay(message);
    const autoPlayEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    message.channel.send(autoPlayEmbed);
  } else {
    return;
  }
};

module.exports.config = {
  name: "autoplay",
  aliases: [],
};
