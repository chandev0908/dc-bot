module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

    let queue = await client.distube.getQueue(message);

    if(queue) {
        client.distube.toggleAutoplay(message);
        let mode = client.distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        setTimeout(() => {
          message.delete();
        }, 3000)
    } else if (!queue) {
        return
    };
}

module.exports.config = {
    name: "autoplay",
    aliases: []
}
