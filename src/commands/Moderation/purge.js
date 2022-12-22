const { SlashCommandBuilder, messageLink } = require('@discordjs/builders');
const {EmbedBuider, PermissionsBitField, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
       .setName('purge') 
       .setDescription('Deletes the specified number of messages in a channel.')
       .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete').setMinValue(1).setMaxValue(100).setRequired(true)),
       async execute(interaction, client) {

       const amount = interaction.options.getInteger('amount');
       const channel = interaction.channel;

       if (!interaction.member.permissions.has(PermissionsBitField.ManageMessages)) return await interaction.reply({ content: "**You do not have permission to manage messages.**", ephermal: true });
       if (!amount) return await interaction.reply({ content: "Please specify the amount of messages you would like to purge.", ephermal: true});
       if (amount > 100 || amount < 1) return await interaction.reply({content: "Please choose a number between 1-100.", ephermal: true});

       await interaction.channel.bulkDelete(amount).catch(err => {
          return;
       });
       await interaction.reply({ content: `Deleted **${amount}** message(s).`, ephemeral: true });
   }
}