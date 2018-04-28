const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser)  return message.channel.send("Couldn't find user.");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You do not have sufficient priviledges to use this command.");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user cannot be banned.");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("!~BANNED~!")
  .setColor("#e03148")
  .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  .addField("Banned By", `${message.author} with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let banChan = message.guild.channels.find(`name`, "incidents");
  if(!banChan) return message.channel.send("Couldn't find incidents channel.");

  message.guild.member(bUser).ban(bReason);
  banChan.send(banEmbed);

}

module.exports.help = {
  name: "ban"
}
