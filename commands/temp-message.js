module.exports.run = (client, message) => {
  let JSONf = JSON.stringify(message.content);
  let matchNum = JSONf.match(/\d/g);
  let wholeNum = matchNum.join("");
  setTimeout(() => {
    message.delete(); 
  }, 1000 * wholeNum)
}

module.exports.config = {
    name: "temp",
    aliases: ["t"]
}