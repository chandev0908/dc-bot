module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );

  let queue = await client.distube.getQueue(message);

  if (queue) {
    client.distube.skip(message);
    message.react("⏭️");
  } else if (!queue) {
    message.channel.send('No music on que')
  }
};

module.exports.config = {
  name: "next",
  aliases: ["n"],
};
