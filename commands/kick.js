const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser)  return message.channel.send("Couldn't find user.");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have sufficient privledges to use this command.");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This user cannot be kicked.");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("!~Kicked~!")
  .setColor("#e03148")
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChan = message.guild.channels.find(`name`, "incidents");
  if(!kickChan) return message.channel.send("Couldn't find incidents channel.");

  message.guild.member(kUser).kick(kReason);
  kickChan.send(kickEmbed);

}

module.exports.help = {
  name: "kick"
}
