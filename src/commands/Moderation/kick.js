const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, Permissions, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from this discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("discord ID of the user")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");

        await interaction.guild.members.kick(userId);

        await interaction.reply({ content: `<@${userId}> has been kicked!`, ephemeral: true }).catch(err => {
            return interaction.reply({ content: 'There was an error.' })
        })



    }
}