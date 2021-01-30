const { Command } = require('discord.js-commando');
const akaneko = require('akaneko');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
      aliases: [],
			group: 'second',
			memberName: 'pause',
      description: 'Music Command',
		});
	}
  
	run(message) {
	  return
  };
}