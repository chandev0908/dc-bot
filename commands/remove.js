module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You must be in a voice channel to use this command."
    );
  let queue = client.distube.getQueue(message);
  let as = queue.songs;
  const music = args.join(" ");
  let queueIndex = parseInt(music)-1;
  let idIndex = as.map((curr, index) => {
    return index;
  });
  let arr = [...idIndex];
  let index = arr.indexOf(queueIndex);
  console.log(index)
  if(index > -1){
    as.splice(index, 1);
  }else if(index === -1){
      message.channel.send("Invalid index queue");
  }
};

module.exports.config = {
  name: "remove",
  aliases: ["rm"],
};
