const { SlashCommandBuilder } = require('@discordjs/builders');
const { ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Bot Commands Help Menu"),
    async execute (interaction, client) {
        const dropdown = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('menu1')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'Guide',
                    description: 'Asteral Bot Guidelines',
                    value: 'first_option',
                },
                {
                    label: 'Asteral Bot Commands',
                    description: 'Asteral Bot Features',
                    value: 'second_option',
                }
            )
        )

        const embed = new EmbedBuilder()
        .setColor('#8b02e0')
        .setDescription(`Asteral Is a **Multi-Purpose Bot** With Many Features!\n**Features:** Moderation, Giveaways, Global Commands & More\n\n<:menu:1054817002918776842>  **Menu** \n\n> <:guide2:1054813512595144735>  **Guide** - Information On Asteral Bot Features\n> \n> <:commands:1054818717176971265> **Commands** - Asteral's Commands & Features\n> \n> <:premium:1054819225111380080> **Asteral Premium** - Premium Subscription With Custom Features!\n> \n> <:PINNED:1054818964007563274> **Socials** - [Github](https://github.com/huncholiny), [Discord](https://discord.gg/QrMPc3ATQs)`)
        .setAuthor({ name: 'Asteral Bot Help Menu', iconURL: 'https://cdn.discordapp.com/attachments/1014124783111262219/1054836530071482510/1054799591867940895.png', url: 'https://github.com/huncholiny' })
        .setTimestamp()

        await interaction.reply({ embeds: [embed], components: [dropdown] })

        const embed1 = new EmbedBuilder()
        .setColor('#8b02e0')
        .setDescription("Thank You For Choosing Asteral Bot, **The Multi-Purpose** Bot!\n\nThis Guide Will Tell you More Information About Astrael and Guide You!")
        .addFields({ name: "<:starss:1054858404281196555> Troubleshoots/Bugs", value: 'If Any Bugs are Found, You Can Inform us through Astrael Support Server! You can Find it in Socials!', inline: false})
        .addFields({ name: "<:premium:1054819225111380080> Premium Subscription", value: 'Premium Subscription Is a Cheap Subscription That Costs $5.00, Including Premium-Only Features!', inline: false})
        .setTimestamp()
        

        const embed2 = new EmbedBuilder()
        .setColor('#8b02e0')
        .addFields({ name: '<:global:1054850090893840528> Global Commands', value: '> `Userinfo` - Information On The User\n> `Flip` - Flips a 50/50 Coin\n> `Meme` - Posts a Random Meme\n> `Joke` - Posts a Hilarious Joke\n> `Avatar` - Posts Users Avatar In Chat!\n> `Pixelate` - Posts a Pixelated Version Of Users Avatar!', inline: false })
        .addFields({ name: '<:commands:1054818717176971265> Moderation Commands ', value: '> `Ticket` - Setups Up Ticket For You!\n> `Mod Logs` - Logs Players Actions In a Channel\n> `Mute` - Times Out A Player\n> `Unmute` - Removes Timeout From User\n> `Kick` - Kicks A User From Server\n> `Ban` - Removes a User From The Server\n> `Unban` - Removes Punishment From User\n> `Warn` - Warns User For Punishment\n> `Purge` - Quick Way To Mass Delete Messages', inline: false })
        .addFields({ name: '<:music:1055439828952567858> Music Commands', value: '> `Play` - Play Music\n> `Stop` - Stop Music\n> `Skip` - Skip Music\n> `Volume` - Increase/Decrease Volume\n> `Shuffle` - Shuffle Music\n> `Rewind` - Replay A Music\n> `Pause` - Pause Music\n> `Resume` - Resume Music\n> `nowplaying` - Shows What Music Is Played\n> `Foward` - Puts Music To a Certain Time', inline: false })
        .addFields({ name: '<:giveaway:1055446842625761280> Giveaway Commands', value: '> `Giveaway Start` - Starts a New Giveaway\n> `Giveaway End` - Ends Selected Giveaway\n> `Giveaway Pause` - Deactivates Your Giveaway\n> `Giveaway Unpause` - Activates Your Giveaway\n> `Giveaway Delete` - Deletes Selected Giveaway\n> `Giveaway Reroll` - Rerolls Giveaway To a New Winner!', inline: false })

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async (i) => {
            if (i.customId === 'menu1') {
                const selected = i.values[0];
                if (selected === 'first_option') {
                    i.reply({ embeds: [embed1] })
                }
                if (selected === 'second_option') {
                    i.reply({ embeds: [embed2] })
                }
            }
        })
    }
}