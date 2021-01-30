const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'temp',
      aliases: ['t'],
			group: 'second',
			memberName: 'temp',
      description: 'Temporary message command',
		});
	}
  
	run(message) {
	  return
  };
}