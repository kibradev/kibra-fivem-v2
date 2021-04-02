const Discord = require('discord.js');
const config = require('../config.js')
let prefix = config.prefix

exports.run = async(client, message, args) => {
  
let type = args.slice(0).join(' ');
if (type.length < 1) {
  
const embed = new Discord.MessageEmbed()

.setColor(config.fivem_error_color)
.setDescription('Doğru Kullanım : ${prefix}hata-bildir <bulduğunuz hata>')

return message.channel.send(embed)
}
  
const embed = new Discord.MessageEmbed()

.setColor(config.fivem_error_color)
.setTitle(config.fivem_error_header)
.addField(config.fivem_error_description,config.fivem_error_dsc2)

message.channel.send(embed)
  
const embed2 = new Discord.MessageEmbed()

.setColor(config.fivem_error_color)

.setDescription(`**${message.author.tag}** Adlı Kullanıcının **Sunucuda Bulduğu Hata ;**`)

.addField(`:envelope: **Gönderen Kişinin Bilgileri ;**`, `:white_small_square: Kullanıcı İd : ${message.author.id}\n:white_small_square: Kullanıcı Adı : ${message.author.username}\n:white_small_square: Kullanıcı Tagı : ${message.author.discriminator} `)
.addField(":pencil: **Gönderilen Hata/Bug Mesajı**", type)

.setThumbnail(message.author.avatarURL)

client.channels.cache.get(config.fivem_error_channel).send(embed2); 

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["hata-bildir","hatabildir"],
    permLevel: 0
}

exports.help = {
    name: config.fivem_error_command,
    description: 'Botta bulduğunuz hatayı belirtilen kanala bildirir.',
    usage: 'hata'
}