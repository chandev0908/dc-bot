module.exports.run = (client, message) => {
  message.channel.send
  ('```Commands:\nTo play music you can use the command .play or .p\nTo skip you can use the command .skip or .s\nTo stop you can use the command .stop\nTo send temporary message you can use the command .temp or .t followed by the duration \nEx. ".temp 15 Hello" or ".t 15 Hello"  after 15secs the message will be deleted \nTo see the features of the bot you can use the command .features or .f```')
}

module.exports.config = {
    name: "help",
    aliases: ["h"]
}