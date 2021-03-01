module.exports.run = (client, message) => {
  message.channel.send(
    '```COMMANDS FOR MUSIC PLAYER\n.play or .p for playing music\n.autoplay for auto que recommended music\n.stop or .s for stopping the music/queue\n.queue or .q to see what music in on que\n.next or .n for skipping music\n.pause to pause the music\n.resume to resume the music\nNOTE: YOU CAN USE THE EMOJI BELOW THE EMBED MESSAGE\n⏹ equivalent to .stop command\n⏯️ equivalent to .pause and .resume \n⏭️ equivalent to .next\nFOR R18 COMMANDS YOU CAN TYPE .hcommands or .H```'
  );
};

module.exports.config = {
  name: "help",
  aliases: [],
};
