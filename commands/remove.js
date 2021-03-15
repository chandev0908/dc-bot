module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );
  let queue = client.distube.getQueue(message);
  let as = queue.songs;

  const music = args.join(" ");
  const queueIndex = parseInt(music) - 1;
  console.log(queueIndex);
  const idIndex = as.map((curr, index) => {
    return index;
  });
  const arr = [...idIndex];
  var index = as.indexOf(queueIndex);
  as.splice(index, 1);
};

module.exports.config = {
  name: "remove",
  aliases: ["rm"],
};
