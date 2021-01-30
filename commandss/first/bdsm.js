const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bdsm',
			group: 'first',
			memberName: 'bdsm',
      description: 'NSFW COMMAND',
      throttling: {
	    	usages: 2,
	    	duration: 86400,
	    },
		});
	}
  
	run(message) {
    async function neko() {
    const data = await akaneko.nsfw.bdsm();
    return message.say(data)
    }
    message.delete({timeout: 1500})
    neko();
	}
};