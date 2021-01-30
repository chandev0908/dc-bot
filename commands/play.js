module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
    
    const music = args.join(" ");

    client.distube.play(message, music)
    setTimeout(() => {
          message.delete();
    }, 3000)
}

module.exports.config = {
    name: "play",
    aliases: ['p']
}
