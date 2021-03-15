const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );
  function embedder(title, description) {
    const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(title)
        .setDescription(description);
    return message.channel.send(embed)
  }
  let queue = client.distube.getQueue(message);
  let as = queue.songs;
  const music = args.join(" ");
  let queueIndex = parseInt(music) - 1;
  let idIndex = as.map((curr, index) => {
    return index;
  });
  let arr = [...idIndex];
  let index = arr.indexOf(queueIndex);
  let num = index > -1 ? as[queueIndex].name : "";
  let idNum = queueIndex + 1;
  if (index > -1) {
    as.splice(index, 1);
    embedder("Removed "+ idNum, "The music `ID " + idNum + "` named `" + num + "` was removed");
  } else if (index === -1) {
    embedder("Invalid", "Invalid input index")
  }
};

module.exports.config = {
  name: "remove",
  aliases: ["rm"],
};
