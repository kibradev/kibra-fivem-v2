const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const fs = require('fs');
const chalk = require('chalk');
const { makeDb } = require('mysql-async-simple');
const mysql = require("mysql");
const moment = require('moment');
require('./util/eventLoader')(client);


const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };
  
  var prefix = config.prefix;
  
  client.on('ready', () => {
    console.log(`Botunuz olan ${client.user.tag} sunucuya giriş yaptı!`);
    client.user.setActivity(config.oynuyor,{ type: config.bot_durum})
    /*client.user.setStatus("IDLE")
    client.user.setActivity(`${prefix}bruh + ${client.guilds.size} sunucu + ${client.users.size} kullanıcı`) */
    .catch(console.error);
  
  });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

const _0xd764=['channel','whitelist_footer','Whitelist\x20başarıyla\x20eklendi.','INSERT\x20INTO\x20whitelist\x20(identifier)\x20VALUES(\x27','248253VJlTOu','339466LZjhVf','343236VKAXwC','14bYfPIM','substring','length','connect','1MGHpAV','mysql_host','addField','query','send','log','content','335308UAEqVs','375259oVAyTb','7242YEyDbF','setAuthor','prefix','createConnection','whitelist_command','1AiuyBf','fivem_server_name','setColor','1sTSKXv','mysql_pass','340923zlyskU','mysql_dbname','setFooter','close'];const _0x5a89=function(_0x5c24b4,_0x27edc6){_0x5c24b4=_0x5c24b4-0x1b2;let _0xd764fc=_0xd764[_0x5c24b4];return _0xd764fc;};(function(_0x53f15f,_0x3c5e8f){const _0x5a8d54=_0x5a89;while(!![]){try{const _0x497b5d=-parseInt(_0x5a8d54(0x1bd))+parseInt(_0x5a8d54(0x1cc))+parseInt(_0x5a8d54(0x1b5))+parseInt(_0x5a8d54(0x1b3))*parseInt(_0x5a8d54(0x1cb))+parseInt(_0x5a8d54(0x1d2))*-parseInt(_0x5a8d54(0x1bf))+parseInt(_0x5a8d54(0x1c0))*parseInt(_0x5a8d54(0x1cd))+parseInt(_0x5a8d54(0x1be))*-parseInt(_0x5a8d54(0x1c4));if(_0x497b5d===_0x3c5e8f)break;else _0x53f15f['push'](_0x53f15f['shift']());}catch(_0x595e3c){_0x53f15f['push'](_0x53f15f['shift']());}}}(_0xd764,0x362e3),client['on']('message',async function(_0x4c5fb5){const _0x2d3c6d=_0x5a89;if(_0x4c5fb5[_0x2d3c6d(0x1ca)][0x0]===config[_0x2d3c6d(0x1cf)]){let _0x12720f=_0x4c5fb5[_0x2d3c6d(0x1ca)][_0x2d3c6d(0x1c1)](_0x4c5fb5[_0x2d3c6d(0x1ca)]['indexOf']('\x20')+0x1,_0x4c5fb5[_0x2d3c6d(0x1ca)][_0x2d3c6d(0x1c2)]);const _0x1a38ef=_0x12720f['split']('\x20'),_0x50ba5a=_0x4c5fb5['content']['split']('\x20');console[_0x2d3c6d(0x1c9)](_0x1a38ef),console[_0x2d3c6d(0x1c9)](_0x50ba5a[0x0]);if(_0x50ba5a[0x0]===prefix+config[_0x2d3c6d(0x1d1)])try{const _0x4c918c=mysql[_0x2d3c6d(0x1d0)]({'host':config[_0x2d3c6d(0x1c5)],'user':config['mysql_user'],'password':config[_0x2d3c6d(0x1b4)],'database':config[_0x2d3c6d(0x1b6)]}),_0x4934d9=makeDb();await _0x4934d9[_0x2d3c6d(0x1c3)](_0x4c918c),await _0x4934d9[_0x2d3c6d(0x1c7)](_0x4c918c,_0x2d3c6d(0x1bc)+_0x1a38ef[0x0]+'\x27)'),await _0x4934d9[_0x2d3c6d(0x1b8)](_0x4c918c);const _0x3c0f01=new Discord['MessageEmbed']()[_0x2d3c6d(0x1ce)](config[_0x2d3c6d(0x1d3)])[_0x2d3c6d(0x1b2)](0x0)[_0x2d3c6d(0x1c6)](_0x50ba5a[0x1],_0x2d3c6d(0x1bb),!![])[_0x2d3c6d(0x1b7)](config[_0x2d3c6d(0x1ba)]);_0x4c5fb5[_0x2d3c6d(0x1b9)][_0x2d3c6d(0x1c8)](_0x3c0f01);}catch(_0x2739bb){}finally{}}}));



client.on('messageDelete', message => {
	console.log(`${message.author.tag} tarafindan mesaj silindi.`);
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config.author) permlvl = 4;
  return permlvl;
};

client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };

  

  client.on('message', message => {
    if (message.content === prefix + config.server_aktif_command) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(config.fivem_server_name, config.fivem_server_logo)
        .setTitle(config.server_aktif_message)
        .setColor(config.server_aktif_color)
        .setImage(config.server_aktif_gif)
        .addField('Sunucu IP',config.fivem_server_ip)
        .addField('Teamspeak IP',config.fivem_teamspeak_ip)
        .setFooter('EMR-KBR');
      message.channel.send(embed);
    }
  });

  client.on('message', message => {
    if (message.content === prefix + config.server_bakım_command) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(config.fivem_server_name, config.fivem_server_logo)
        .setTitle(config.server_bakım_message)
        .setColor(config.server_bakım_color)
        .setImage(config.server_bakım_gif)
        .setFooter('EMR-KBR');
      message.channel.send(embed);
    }
  });


  client.on('message', message => {
    if (message.content === prefix + config.destek_command) {
      const embed = new Discord.MessageEmbed()
        .setTitle(config.destek_title)
        .setColor(config.destek_color)
        .addField(config.destek_message,'Destek Bekleme Odasında bekleyiniz.')
        .setDescription(config.fivem_server_staff_id);
      message.channel.send(embed);
    }
  });

  client.on('message', msg => {
    if (msg.content === prefix + config.destek_command) {
      msg.channel.send(config.fivem_server_staff_id);
    }
  });

  client.on('message', message => {
    if (message.content === prefix + config.kayit_cagirma_command) {
      const embed = new Discord.MessageEmbed()
        .setTitle(config.kayit_title)
        .setColor(config.kayit_color)
        .addField(config.kayit_message,'Kayıt Bekleme Odasında bekleyiniz.')
        .setDescription(config.fivem_server_staff_id);
      message.channel.send(embed);
    }
  });

  client.on('message', msg => {
    if (msg.content === prefix + config.kayit_cagirma_command) {
      msg.channel.send(config.fivem_server_staff_id);
    }
  });

  

  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(config.token);