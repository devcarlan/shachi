const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

  /*
   * !cat
   * Pulls random image from random.cat
   * Uses JSON
   */

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dog = new Discord.RichEmbed()
  .setColor("#ff9900")
  .setTitle("Doge")
  .setImage(body.url);

  message.channel.send(dog);

} //end of module

module.exports.help = {
  name: "dog"
}
