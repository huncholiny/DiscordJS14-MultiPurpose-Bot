const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require("ms");
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Gives the user a timeout")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The target")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("time")
                .setDescription("Amount of time")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason for the mute")
        ),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const { options } = interaction;
 
    const target = options.getUser("target");
    const time = options.getString("time");
    const convertedTime = ms(time);
    const reason = options.getString("reason") || "null";
 
    const member = await interaction.guild.members.fetch(target.id);
 
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({
        content: "Your missing the **manage_messages** permission",
        ephemeral: true
     })
 
     if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({
        content: "I'm missing the **manage_messages** permission",
        ephemeral: true
     })
 
    if (member.roles.highest.position >= interaction.member.roles.highest.position)
        return interaction.reply({ 
            content: `You can't take action on ${target.username} since they have a higher role` ,
            ephemeral: true
        });
 
    const embed = new EmbedBuilder()
    .setColor('#8b02e0')
        .setDescription(`
        ***${target.username}*** *has been muted*  :microphone2: 
        :notepad_spiral: **Reason:** ${reason}
        :alarm_clock:  **Time:** ${time}
        `)
 
    try {
        await member.timeout(convertedTime, reason)
        .catch((err) => {
            const error = new EmbedBuilder()
            .setColor('#8b02e0')
            .setDescription(`
            *There's been an ***error*** muting* ***${target} :microphone2:
            :robot: **Error:** ${err}
            `)
            .setFooter({ text: `${target.username} | ${target.id}` })
 
            interaction.reply({
                embeds: [error],
                ephemeral: true
            })
        });
 
        interaction.reply({ embeds: [embed] });
    } catch (err) {
        console.log(err)
    }
  }
}