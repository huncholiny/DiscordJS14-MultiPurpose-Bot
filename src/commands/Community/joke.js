const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tells a dadjoke"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const fetch = require("node-fetch");

        async function GenerateJoke() {
            const Response = await fetch("https://icanhazdadjoke.com", {
                method: "GET",
                headers: { Accept: "application/json" },
            });
            const JSON = await Response.json();
            const DadJoke = JSON.joke;
            await interaction.reply({
                content: `${DadJoke} :joy:`
            });
        }
        GenerateJoke();
    }
}