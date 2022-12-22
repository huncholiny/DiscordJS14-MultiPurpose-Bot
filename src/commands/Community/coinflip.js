const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("This flips a coin. Heads or Tails."),

    async execute(interaction) {

        const choices = ["Heads", "Tails"]
        const randomChoice = choices[Math.floor(Math.random()*choices.length)];

        await interaction.reply({ content: `It landed on.... **${randomChoice}** :coin:`})
    }
}