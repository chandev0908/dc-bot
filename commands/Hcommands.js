const Discord = require("discord.js");
module.exports.run = (client, message) => {
  message.reply("the list of nsfw commands will be send to you private")
  const msgEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("NSFW COMMANDS")
    .setDescription("`ass`, `bdsm`, `bj`, `cum`, `doujin`, `feet`, `femdom`, `fox`, `gifs`, `glasses`, `hentai`, `lewdneko`, `loli`, `maid`, `masturbation`, `neko`, `netorare`, `orgy`, `panties`, `pussy`, `school`, `tentacles`, `thighs`, `uglybastard`, `uniform`, `yuri`, `zetai`")
  message.author.send(msgEmbed);
};

module.exports.config = {
  name: "nsfw-commands",
  aliases: [],
};
