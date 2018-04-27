const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.displayAvatarURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Information")
  .setColor("#3f31e0")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Server Creation Date", message.guild.createdAt)
  .addField("You Joined On", message.member.joinedAt)
  .addField("Members in Server", message.guild.memberCount);

  return message.channel.send(serverembed);

}

module.exports.help = {
  name: "serverinfo"
}
