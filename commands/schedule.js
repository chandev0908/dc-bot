const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  // const date = new Date().toLocaleString("en-US",{timeZone: "Asia/Singapore"})
  // const todayDate = new Date(date);
  // const Day = todayDate.getDay();
  function embed(description) {
    const schedEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Class Schedule Today!")
      .setDescription(description);
    return message.channel.send(schedEmbed);
  }
  // if(Day === 2){
  embed("**May 20**\n08:00 - 9:30 MATH\n12:00 - 13:30\n16:00 - 17:30 PE\n**MAY 21**\n14:00 - 15:30 HCI");
  // }
  // }else if(Day === 3){
  //     embed("08:30-10:00 Rizal\n10:00-11:30 PSY\n13:00-14:30 Public Speaking\n14:30-16:00 NSTP");
  // }else if(Day === 4){
  //     embed("07:00-10:00 CC3\n10:00-12:00 PE\n13:00-14:30 HCI\n14:30-16:00 MATH")
  // }else if(Day === 5){
  //     embed("08:30-10:00 Rizal\n10:00-11:30 PSY\n13:00-14:30 Public Speaking\n14:30-16:00 NSTP");
  // }else{
  //     embed("No class schedule today. Have a nice day!")
  // }
};

module.exports.config = {
  name: "schedule",
  aliases: [],
};
