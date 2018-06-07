const Discord = require("discord.js");
const fs = require("fs");
var bot = new Discord.Client();
const Music = require('discord.js-musicbot-addon');
const settings = require("./settings.json");

Music.start(bot, {
youtubeKey: "AIzaSyChV72AqgUOWab694WT3zdK6EIbY0EGRuc",
  prefix: settings.prefix, // Prefix for the commands.
  global: false,            // Non-server-specific queues.
  maxQueueSize: 50,        // Maximum queue size of 25.
  clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.
  helpCmd: 'mhelp',        // Sets the name for the help command.
  playCmd: 'play',        // Sets the name for the 'play' command.
  volumeCmd: 'adjust',     // Sets the name for the 'volume' command.
  leaveCmd: 'leave',      // Sets the name for the 'leave' command.
  disableLoop: false        // Disable the loop command.
});

var google = `<@409751964662890508>`

bot.commands =  new Discord.Collection();

const prefix = settings.prefix;

fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No commands to load!")
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });
});
bot.on("ready", async () => {
    console.log("Bot Ready!");
    console.log("Settings:")
    console.log(`Name: ${bot.user.username}#${bot.user.discriminator}`);
    console.log("Token: " + settings.token);
    console.log("Prefix: " + settings.prefix);
    console.log(bot.commands);
    bot.user.setActivity("students learn", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.content.bot) return;

    let messsageArray = message.content.split(" ");
    let command = messsageArray[0];
    let args = messsageArray.slice(1);

    if(!command.startsWith(settings.prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

      });
bot.login("NDUzOTcwMTUyNjIzNzAyMDI2.DfmoLg.Lr9G3txiP6JaGE5d9sqKcHG8XdU");
