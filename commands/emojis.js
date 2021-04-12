module.exports.run = (client, message) => {
    const emojiList = client.emojis.cache.map(e=>e.toString()).join(" ");
    message.channel.send(emojiList);
};

module.exports.config = {
  name: "allemojis",
  aliases: [],
};
