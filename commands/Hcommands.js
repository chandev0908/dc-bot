module.exports.run = (client, message) => {
  message.reply("the list of commands will be send to you private")
  message.author.send("TAMAD PA MAG TYPE NG MGA COMMANDS")
};

module.exports.config = {
  name: "hcommands",
  aliases: [],
};
