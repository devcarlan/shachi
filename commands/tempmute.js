const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

  /*
   * !tempmute
   * @user
   * @time 1s/m/h/d
   */
  let tomute = (message.mentions.members.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find that user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("That user cannot be muted!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //create role muterole
  if(!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#e03148",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGE: false,
          ADD_REACTIONS: false
        });
      });
    } catch(e){
      console.log(e.stack);
    }
  } //end create role muterole


  let mutetime = args[1];
  if(!mutetime) return message.reply("You must specify a time for length of mute!")

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> is now unmuted.`);

  }, ms(mutetime));

} //end of module


module.exports.help = {
  name: "tempmute"
}
