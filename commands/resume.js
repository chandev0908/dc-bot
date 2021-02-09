module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );

  let queue = await client.distube.getQueue(message);

  if (queue) {
    client.distube.resume(message, queue);
    message.react("▶️");
  } else if (!queue) {
    return;
  }
};

module.exports.config = {
  name: "resume",
  aliases: [],
};
