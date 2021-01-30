const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tentacles',
			group: 'first',
			memberName: 'tentacles',
      description: 'NSFW COMMAND',
      throttling: {
	    	usages: 2,
	    	duration: 86400,
	    },
		});
	}
  
	run(message) {
    async function neko() {
    const data = await akaneko.nsfw.tentacles();
    return message.say(data)
    }
    message.delete({timeout: 1500})
    neko();
	}
};