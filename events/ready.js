module.exports = (bot) => {
  console.log("Bot is online!");
  const iconRole = {
    Dota2: "851407509536636948",
    Lol: "851407137955250216",
    Genshin: "851420558088208414",
    EpicGames: "851413519315238943",
    Osu: "851412980150173717",
    Valorant: "851412980393705523",
    Coding: "851413603528867861",
    Arts: "851412979869810689",
    Gamedev: "851413634528706622",
    Nsfw: "851412980398293052",
  };
  bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const gameRolesEmbed = "851457842430607371";
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Dota2
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851394672718512148");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Lol
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851355081487810560");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Genshin
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("826814428456157234");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.EpicGames
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851735733957165076");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Valorant
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851399502405173248");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Osu
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851399473543249921");
    }
    const otherRolesEmbed = "851457845592457216";
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Coding
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851634315762466866");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Arts
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851399541806465034");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Gamedev
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851395018345414667");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Nsfw
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("851399596298338324");
    }
  });
  bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const gameRolesEmbed = "851457842430607371";
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Dota2
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851394672718512148");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Lol
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851355081487810560");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Genshin
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("826814428456157234");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.EpicGames
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851735733957165076");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Valorant
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851399502405173248");
    }
    if (
      reaction.message.id === gameRolesEmbed &&
      reaction.emoji.id === iconRole.Osu
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851399473543249921");
    }
    const otherRolesEmbed = "851457845592457216";
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Coding
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851634315762466866");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Arts
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851399541806465034");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Gamedev
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851395018345414667");
    }
    if (
      reaction.message.id === otherRolesEmbed &&
      reaction.emoji.id === iconRole.Nsfw
    ) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("851399596298338324");
    }
  });
};
