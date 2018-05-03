const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  /*
   * !warn
   * @user
   * @reason
   */
   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You do not have sufficient priviledges to use this command.");
   let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   if(!wUser) return message.reply("Couldn't find that user on this server.");
   if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This user is above your pay grade.");
   let reason = args.join(" ").slice(22);

   if(!warns[wUser.id]) warns[wUser.id] = {
     warns: 0
   };

   warns[wUser.id].warns++;

   fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
   });

   let warnEmbed = new Discord.RichEmbed()
   .setDescription("Warnings")
   .setAuthor(message.author.username)
   .setColor("#efc91f")
   .addField("Warned User", `<@${wUser.id}>`)
   .addField("Warned In", message.channel)
   .addField("Number of Warnings", warns[wUser.id].warns)
   .addField("Reason", reason);

   let warnChan = message.guild.channels.find(`name`, "incidents");
   if(!warnChan) return message.channel.send("Couldn't find incidents channel.");

   warnChan.send(warnEmbed);

   if(warns[wUser.id].warns == 2) {
     let muterole = message.guild.roles.find(`name`, "muted");
     if(!muterole) return message.reply("You need to create a role for muted users.");

     let mutetime = "10s";
     await(wUser.addRole(muterole.id));
     message.reply(`<@${wUser.id}> has been temporarily muted.`);

     setTimeout(function() {
       wUser.removeRole(muterole.id)
       message.reply(`<@${wUser.id}> has been unmuted.`)
     }, ms(mutetime))
   }

   if(warns[wUser.id].warns == 3) {
     message.guild.member(wUser).ban(reason);
     message.reply(`<@${wUser.id}> has been banned.`);
   }

} //end of module

module.exports.help = {
  name: "warn"
}
