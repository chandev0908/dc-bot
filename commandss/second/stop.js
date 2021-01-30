const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'second',
			memberName: 'stop',
      description: 'Music Command',
		});
	}
  
	run(message) {
	  return
  };
}