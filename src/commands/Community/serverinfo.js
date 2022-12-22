const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Embed } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`serverinfo`)
        .setDescription(`Server Information And Features`),
     async execute (interaction) {

        owner = str(ctx.guild.owner)
        id = str(ctx.guild.id)
        region = str(ctx.guild.region)
        memberCount = str(ctx.guild.member_count)
      
        embed.set_thumbnail(url=icon)
        embed.add_field(name="Owner", value=owner, inline=True)
        embed.add_field(name="Server ID", value=id, inline=True)
        embed.add_field(name="Region", value=region, inline=True)
        embed.add_field(name="Member Count", value=memberCount, inline=True)

        await interaction.reply({ embeds: [embed] });
    
     }
}