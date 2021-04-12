const akaneko = require("akaneko");
module.exports.run = (client, message) => {
  async function neko() {
    const data = await akaneko.nsfw.bdsm();
    return message.channel.send(data);
  }
  neko();
};

module.exports.config = {
  name: "bdsm",
  aliases: [],
};
