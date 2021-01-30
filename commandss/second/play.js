const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
      aliases: ['p'],
			group: 'second',
			memberName: 'play',
      description: 'Music Command',
		});
	}
  
	run(message) {
	  return
  };
}