const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const YTNotifier = require("youtube-notification");
const discord = require("discord.js")
const client = new discord.Client();
const config = require('./config.json')
client.on("ready", () => {
  console.log("Watching " + config.CHANNEL_ID.length + " Channels");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "https://github.com/chandev0908/discordBot",
      type: "PLAYING"
    }
  });
});
const listener = server.listen(process.env.PORT, () =>
  console.log(`Your app is listening on port ` + listener.address().port)
);
const notifier = new YTNotifier({
  hubCallback: "https://sleepy-sands-66607.herokuapp.com/yt",
  secret: "WEEBUS_BOT"
});

notifier.on("notified", data => {
  console.log("New Video");
  client.channels.cache.get(config.SERVER_CHANNEL_ID).send(
      `**${data.channel.name}** new video - **${data.video.link} @everyone**`
    );
});

notifier.subscribe(config.CHANNEL_ID);

app.use("/yt", notifier.listener());