const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("being coded!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}hello`) {
    return message.channel.send("Hello!");
  }

  if(cmd === `${prefix}info`) {
    let icon = bot.user.iconURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("More About Shachi")
    .setColor("#3f31e0")
    .setThumbnail(icon)
    .addField("Name", bot.user.username)
    .addField("Creation Date", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}serverinfo`) {
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

  if(cmd === `${prefix}report`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason =  args.join(" ").slice(22);


    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#3f31e0")
    .addField("Reported User", `${rUser} with ID ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find a reports channel.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}kick`) {
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

    return;
  }

});

bot.login(tokenfile.token);
