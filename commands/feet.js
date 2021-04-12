const akaneko = require("akaneko");
module.exports.run = (client, message) => {
  async function neko() {
    const data = await akaneko.nsfw.feet();
    return message.channel.send(data);
  }
  neko();
};

module.exports.config = {
  name: "feet",
  aliases: [],
  cooldown: 5000
};
