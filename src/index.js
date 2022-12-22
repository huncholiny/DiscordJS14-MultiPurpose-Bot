const { Client, Events, GatewayIntentBits, EmbedBuilder, Partials, PermissionsBitField, Permissions, MessageManager, Embed, Collection, AuditLogEvent } = require(`discord.js`);
const fs = require('fs');
const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: Object.keys(Partials),
  });

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const logSchema = require("./Models/Logs");
const YoutubePoster = require("discord-youtube");
const logs = require("discord-logs");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.on('ready', () => {
    const activities = [
        
          { name: `${client.guilds.cache.size} Servers`, type: 2 }, // PLAYING
          
      ];
      const status = [
          'online'
          
      ];
      let i = 0;
      setInterval(() => {
          if(i >= activities.length) i = 0
          client.user.setActivity(activities[i])
          i++;
      }, 5000);
    
      let s = 0;
      setInterval(() => {
          if(s >= activities.length) s = 0
          client.user.setStatus(status[s])
          s++;
      }, 5000);
  });

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    
    client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true, // you can change this to your needs
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});
client.ytp = new YoutubePoster(client, {
  loop_delay_in_min: 1
});
client.commands = new Collection();
client.config = require("./config.js");
client.giveawayConfig = require("./config.js");

["giveawaysEventsHandler", "giveawaysManager"].forEach((x) => {
  require(`./Utils/${x}`)(client)
})

module.exports = client;
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

//MOD LOGS

function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) return console.log("Log channel is not setup yet.");
            const LogChannel = client.channels.cache.get(data.Channel);
            if (!LogChannel) return console.log("Log channel is not setup yet.");
            LogChannel.send({ embeds: [embed] });
        });
    }

client.on(Events.ChannelCreate, async channel => {

    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Form'
        if (type == 5) type = 'Announcement'
        if (type == 5) type = 'Category'

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Channel Created")
        .addFields({ name: "Channel Name", value: `${name} (<@${id}>)`, inline:false})
        .addFields({ name: "Channel Type", value: `${type}`, inline: false})
        .addFields({ name: "Channel ID", value: `${id}`, inline: false})
        .addFields({ name: "Channel By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(channel.guild.id, embed);
    })
})

client.on(Events.ChannelDelete, async channel => {

    channel.guild.fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = channel.name;
        const id = channel.id;
        let type = channel.type;

        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Form'
        if (type == 5) type = 'Announcement'
        if (type == 5) type = 'Category'
        
        if (channel.id == data.Channel) {
            logSchema.findOneAndDelete({ Guild: channel.guild.id });
        }

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Channel Deleted")
        .addFields({ name: "Channel Name", value: `${name}`, inline:false})
        .addFields({ name: "Channel Type", value: `${type}`, inline: false})
        .addFields({ name: "Channel ID", value: `${id}`, inline: false})
        .addFields({ name: "Deleted By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(channel.guild.id, embed);
    })
})

client.on(Events.GuildBanAdd, async member => {

    member.guild.fetchAuditLogs({
        type: AuditLogEvent.GuildBanAdd,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = member.user.username;
        const id = member.user.id;

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Member Banned")
        .addFields({ name: "Member Name", value: `${name} (<@${id}>)`, inline:false })
        .addFields({ name: "Member ID", value: `${id}`, inline: false})
        .addFields({ name: "Banned By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(member.guild.id, embed);
    })
})

client.on(Events.GuildBanRemove, async member => {

    member.guild.fetchAuditLogs({
        type: AuditLogEvent.GuildBanRemove,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const name = member.user.username;
        const id = member.user.id;

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Member Unbanned")
        .addFields({ name: "Member Name", value: `${name} (<@${id}>)`, inline:false })
        .addFields({ name: "Member ID", value: `${id}`, inline: false})
        .addFields({ name: "Unbanned By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(member.guild.id, embed);
    })
})

client.on(Events.MessageDelete, async message => {

    message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const mes = message.content;

        if (!mes) return;
        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Message Deleted")
        .addFields({ name: "Member Content", value: `${mes}`, inline:false })
        .addFields({ name: "Member Channel", value: `${message.channel}`, inline: false})
        .addFields({ name: "Deleted By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(message.guild.id, embed);
    })
})

client.on(Events.MessageUpdate, async (message, newMessage) => {

    message.guild.fetchAuditLogs({
        type: AuditLogEvent.MessageUpdate,
    })
    .then(async audit => {
        const { executor } = audit.entries.first()

        const mes = message.content;

        if (!mes) return;

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setTitle("Message Edited")
        .addFields({ name: "Old Message", value: `${mes}`, inline:false })
        .addFields({ name: "New Message", value: `${newMessage}`, inline: false})
        .addFields({ name: "Edited By", value: `${executor.tag}`, inline: false})
        .setTimestamp()
        .setFooter({ text: "Mod Logging System"})
        send_log(message.guild.id, embed);
    })
});