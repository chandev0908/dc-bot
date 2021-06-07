const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (message.author.id === "375992650429628416") {
    message.delete({ timeout: client.ws.ping });
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
    const dota = client.emojis.cache.get(iconRole.Dota2);
    const lol = client.emojis.cache.get(iconRole.Lol);
    const genshin = client.emojis.cache.get(iconRole.Genshin);
    const epicgames = client.emojis.cache.get(iconRole.EpicGames);
    const osu = client.emojis.cache.get(iconRole.Osu);
    const valorant = client.emojis.cache.get(iconRole.Valorant);
    const coding = client.emojis.cache.get(iconRole.Coding);
    const arts = client.emojis.cache.get(iconRole.Arts);
    const gamedev = client.emojis.cache.get(iconRole.Gamedev);
    const nsfw = client.emojis.cache.get(iconRole.Nsfw);
    const selfroleChannel = client.channels.cache.get(
      process.env.SELF_ROLE_CHANNEL
    );
    const attachment = new Discord.MessageAttachment(
      "./img/GameRolesSign.png",
      "GameRolesSign.png"
    );
    const gameRoleSign = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .attachFiles(attachment)
      .setImage("attachment://GameRolesSign.png");
    const attachment2 = new Discord.MessageAttachment(
      "./img/divider.gif",
      "divider.gif"
    );
    const divider = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .attachFiles(attachment2)
      .setImage("attachment://divider.gif");
    const attachment3 = new Discord.MessageAttachment(
      "./img/OtherRolesSign.png",
      "OtherRolesSign.png"
    );
    const otherRoleSign = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .attachFiles(attachment3)
      .setImage("attachment://OtherRolesSign.png");
    await selfroleChannel.send(gameRoleSign);
    const roleGameEmbed = new Discord.MessageEmbed()
      .setTitle("**Game Roles**")
      .setColor("#0099ff")
      .setDescription(
        `${dota} - DOTA 2\n${genshin} - Genshin Impact\n${lol} - League of Legends\n${osu} - Osu\n${valorant} - Valorant\n${epicgames} - Epic Games`
      );
    let roleGameEmbedSend = await selfroleChannel.send(roleGameEmbed);
    await selfroleChannel.send(divider);
    await selfroleChannel.send(otherRoleSign);
    const roleHobbiesEmbed = new Discord.MessageEmbed()
      .setTitle("**Hobbies and Other Stuff**")
      .setColor("#0099ff")
      .setDescription(
        `${arts} - Arts\n${coding} - Coding/Programming Related\n${gamedev} - Game Development\n${nsfw} - NSFW`
      );
    let roleHobbiesEmbedSend = await selfroleChannel.send(roleHobbiesEmbed);
    try {
      await roleGameEmbedSend.react(iconRole.Dota2);
      await roleGameEmbedSend.react(iconRole.Genshin);
      await roleGameEmbedSend.react(iconRole.Lol);
      await roleGameEmbedSend.react(iconRole.Osu);
      await roleGameEmbedSend.react(iconRole.Valorant);
      await roleGameEmbedSend.react(iconRole.EpicGames);
      await roleHobbiesEmbedSend.react(iconRole.Arts);
      await roleHobbiesEmbedSend.react(iconRole.Coding);
      await roleHobbiesEmbedSend.react(iconRole.Gamedev);
      await roleHobbiesEmbedSend.react(iconRole.Nsfw);
    } catch {
      console.log("error emoji");
    }
  }else{
      message.channel.send("Only bot owner can use this command");
  }
};

module.exports.config = {
  name: "selfrole",
  aliases: [],
};
