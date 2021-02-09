module.exports.run = (client, message) => {
  message.channel.send(
    "```Features of this Bot:\nEveryone will be notify if subscribe youtuber upload or live\nYou can send temporary message or pictures\nYou can use the bot to play music\nReminding weebus to their class schedule[SOON]\nBot can send random hen*** image[SOON]```"
  );
};

module.exports.config = {
  name: "features",
  aliases: ["f"],
};
