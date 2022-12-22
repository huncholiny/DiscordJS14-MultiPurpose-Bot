const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Removes the timeout")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The target")
                .setRequired(true)
        ),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    const { options } = interaction;
 
    const target = options.getUser("target");
 
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
        ***${target.username}*** *has been unmuted* :loud_sound: 
        `)
 
    try {
        await member.timeout(null)
        .catch((err) => {
            const error = new EmbedBuilder()
            .setColor('#8b02e0')
            .setDescription(`
            *There's been an ***error*** unmuting* ***${target} :sound:
            <:single:1045665817284575282> **Error:** ${err}
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