const akaneko = require('akaneko');
module.exports.run = (client, message) => {
    async function neko() {
        const data = await akaneko.nsfw.pussy();
        return message.channel.send(data)
    }
    message.delete({timeout: 1500})
    neko();
}

module.exports.config = {
    name: "pussy",
    aliases: []
}  