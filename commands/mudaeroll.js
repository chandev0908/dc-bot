module.exports.run = async (client, message) => {
  message.channel.send("$wa");
  message.delete({ timeout: 3000 });
};

module.exports.config = {
  name: "rolls",
  aliases: [],
};
