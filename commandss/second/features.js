const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'features',
      aliases: ['f'],
			group: 'second',
			memberName: 'features',
      description: 'Utility commands',
		});
	}
  
	run(message) {
	  return
  };
}