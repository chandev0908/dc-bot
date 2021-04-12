module.exports.run = (client, message) => {
  message.delete({timeout: 1200})
};

module.exports.config = {
  name: "temp",
  aliases: ["t"],
};
