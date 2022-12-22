const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Getsuser's avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),

  async execute(interaction, client) {
          const { options } = interaction;
    const user = options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });

    await interaction.reply({
      content: avatarUrl,
    });
  },
};