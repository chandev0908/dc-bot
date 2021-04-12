const akaneko = require('akaneko');
module.exports.run = (client, message) => {
    async function neko() {
        const data = await akaneko.nsfw.loli();
        return message.channel.send(data)
    }
    neko();
}

module.exports.config = {
    name: "loli",
    aliases: []
}  