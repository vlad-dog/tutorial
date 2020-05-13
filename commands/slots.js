const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":strawberry:", ":strawberry:", ":cherries:"];
const db = require("quick.db");
const Discord = require('discord.js');
const i = require('i')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  

    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You are betting more than you have`);

    let moneyhelp = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:cross: Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#FFFFFF")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }