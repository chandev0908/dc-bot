module.exports.run = (client, message) => {
    const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList);
};

module.exports.config = {
  name: "allemojis",
  aliases: [],
};
