const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription("Bans the member provided.")
    .addUserOption((option) => 
    option 
    .setName("target")
    .setDescription("The member you'd like to ban")
    .setRequired(true)

)
     .addStringOption(option => 
        option
        .setName('reason')
        .setDescription('The reason for banning the member provided.')
     ),
     
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        let  reason = interaction.options.getString('reason');
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

        if(!reason) reason = "No reason provided.";

        await member 
        .ban({
            days: 1, 
            reason: reason,
        })
        .catch(console.error);
     
     await interaction.reply({
        content: ` ${user} has been banned!`,ephemeral: true
    });
    },
};