const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  //!8ball <questions swergff>
  if(!args[2]) return message.reply("Ask a full question. Don't seal your fate before asking me. Dummy.")

  let replies = ["Yes.", "No.", "I don't know.", "Ask me again later."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");

  let ballEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#FF9900")
  .addField("Question", question)
  .addField("Answer", replies[result]);

  message.channel.send(ballEmbed);
}


module.exports.help = {
  name: "8ball"
}
