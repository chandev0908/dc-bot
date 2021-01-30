const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hentai',
			group: 'first',
			memberName: 'hentai',
      description: 'NSFW COMMAND',
      throttling: {
	    	usages: 2,
	    	duration: 86400,
	    },
		});
	}

	run(message) {
    async function neko() {
    const data = await akaneko.nsfw.hentai();
    return message.say(data)
    }
    message.delete({timeout: 1500})
    neko();
	}
};