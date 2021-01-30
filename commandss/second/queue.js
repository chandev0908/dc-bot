const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
      aliases: ['q'],
			group: 'second',
			memberName: 'queue',
      description: 'Music Command',
		});
	}
  
	run(message) {
	  return
  };
}