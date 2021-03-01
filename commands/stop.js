const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );
  try {
    let queue = await client.distube.getQueue(message);
    if (queue) {
      client.distube.stop(message);
      message.react("🛑");
      const stopEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("STOPPED")
        .setDescription("Thanks for using the bot bye! byee!👋");
      message.channel.send(stopEmbed);
    } else if (!queue) {
      return;
    }
  } catch (err) {
    return err;
  }
};

module.exports.config = {
  name: "stop",
  aliases: ["s"],
};
