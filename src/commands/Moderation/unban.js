const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a banned user from this discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("discord ID of the user")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        await interaction.guild.members.unban(userId);

        await interaction.reply({ content: `<@${userId}> has been unbanned!`, ephemeral: true }).catch(err => {
            return interaction.reply({ content: 'There was an error.' })
        })



    }
}