const akaneko = require('akaneko');
module.exports.run = (client, message) => {
    async function neko() {
        const data = await akaneko.nsfw.yuri();
        return message.channel.send(data)
    }
    message.delete({timeout: 1500})
    neko();
}

module.exports.config = {
    name: "yuri",
    aliases: []
}  