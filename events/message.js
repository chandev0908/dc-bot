const Duration = require('humanize-duration');
module.exports = async (bot, message) => {
	if (message.author.bot) return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (message.author.bot || message.channel.type === 'dm') return;
	const prefix = ".";

	if (message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) return message.channel.send(`${message.guild.name}'s Prefix is \`${prefix}\`\n\nTo get a list of commands, say \`${prefix}help\``);

	if (!message.content.startsWith(prefix)) return;
	const commandfile = bot.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
	// if(bot.cooldown.has(`${message.author.id}-${commandfile.config.name}`)){
	// 	return message.channel.send(`You can use this command in ${ms(bot.cooldown.get(`${message.author.id}-${commandfile.config.name}`) - Date.now(), {long: true})}`);
	// }
	if (commandfile) {
		commandfile.run(bot, message, args);
		// if(commandfile.config.cooldown) {
		// 	bot.cooldown.set(`${message.author.id}-${commandfile.config.name}`, Date.now() + commandfile.config.cooldown)
		// 	setTimeout(() => {
		// 		bot.cooldown.delete(`${message.author.id}-${commandfile.config.cooldown}`)
		// 	}, commandfile.config.cooldown)
		// }
	}

}
