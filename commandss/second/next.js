const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'next',
			group: 'second',
			memberName: 'next',
      description: 'Music Command',
		});
	}
  
	run(message) {
	  return
  };
}