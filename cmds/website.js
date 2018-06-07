const Discord = require("discord.js");
const client = new Discord.Client();
let bot = new Discord.Client();
var prefix = "b!"
module.exports.run = async (bot, message, args, settings) => {
  var embed = new Discord.RichEmbed()
  .setColor(0x700FF)
  .setAuthor(" | Here is Brinsworth Academy's website link!", `${bot.user.avatarURL}`)
  .addField("http://www.brinsworthacademy.org.uk/", "Here is the website!")
  message.channel.send(embed)
  }

module.exports.help = {
    name: "website"
}
