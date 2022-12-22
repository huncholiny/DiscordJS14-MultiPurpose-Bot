const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Embed } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`userinfo`)
        .setDescription(`This gets Basic User Info!`)
        .addUserOption(option => option.setName('user').setDescription('The User You Want to Get Info On')),
     async execute (interaction) {

        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id)
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "Member", value: `${user}`, inline: false})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .setFooter({ text: `User ID: ${user.id}`})
        .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    
     }
}