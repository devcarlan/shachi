const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  /*
   * !removerole
   * @user
   * @role
  */
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You do not have sufficient priviledges to use this command.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Please specify a role.");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I couldn't find that role in this server.");

  if(!rMember.roles.has(gRole.id)) return message.reply("This user does not have that role.");
  await(rMember.removeRole(gRole.id));

  let guild = message.guild;

  try {
    await rMember.send(`<@${rMember.id}> you've been stripped of the role ${gRole.name} in the server ${guild.name}.`);
  } catch(e) {
    message.channel.send(`<@${rMember.id}> has been stripped of the role ${gRole.name}. Publicly announced because their DMs are private.`);
  } //end addrole
} //end of module


module.exports.help = {
  name: "removerole"
}
