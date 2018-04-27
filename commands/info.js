const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let icon = bot.user.iconURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("More About Shachi")
  .setColor("#3f31e0")
  .setThumbnail(icon)
  .addField("Name", bot.user.username)
  .addField("Creation Date", bot.user.createdAt);

  return message.channel.send(botembed);

}

module.exports.help = {
  name: "info"
}
