const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, PermissionsBitField, RoleManager } = require('discord.js')
const TicketSetup = require("../../Models/Ticket");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Use this command to create a ticket message')
        .addChannelOption(options => options.setName('category').setDescription('Where you want the tickets to go').setRequired(true))
        .addRoleOption(options => options.setName('handlers').setDescription('Tickets Will be Visible to the Selected Role').setRequired(true)),

    async execute(interaction, client, options) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must be an administrator to execute this command!", ephemeral: true });

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button')
                    .setEmoji('📩')
                    .setLabel('Create a Ticket')
                    .setStyle(ButtonStyle.Secondary),
            )
        
        const embed = new EmbedBuilder()
            .setColor('#8b02e0')
            .setTitle('Tickets & Support')
            .setDescription('Click the button below to create a ticket for anything you may need (create a ticket)')

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            const category = interaction.options.getChannel('category')
            const handlers = interaction.options.getRole('handlers')

            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: category
            });

            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true });
            channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });

            const ticketEmbed = new EmbedBuilder()
                .setTitle(`Welcome to your ticket.`)
                .setColor('#8b02e0')
                .setDescription(`Please describe what your needs are or what you need in a detailed format! When you are finished here, have an admin delete the channel. Please save anything you may need in a safe place as transcripts are not yet available.`)

            const closeTicket = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('buttonticket')
                        .setEmoji('🔒')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Primary),
            
                    new ButtonBuilder()
                        .setCustomId('deleteticket')
                        .setEmoji('⛔')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger),
                )
            
            channel.send({ embeds: [ticketEmbed], components: [closeTicket], content: `Welcome to your ticket, ${i.user}!`})
            i.user.send(`Your ticket within ${i.guild.name} has been created, you can view it in ${channel}. `).catch(err => {
                return;
            })
        })
    }
}