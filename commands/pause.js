module.exports.run = async (client, message) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );

  let queue = await client.distube.getQueue(message);

  if (queue) {
    client.distube.pause(message, queue);
    message.react("⏸️");
  } else if (!queue) {
    return;
  }
};

module.exports.config = {
  name: "pause",
  aliases: [],
};
