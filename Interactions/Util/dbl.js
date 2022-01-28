const Interaction = require('../../Structures/Interaction.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = class DbleInteraction extends Interaction {
  constructor() {
    super("dbl", {
      type: 1,
      description: 'Vote em nosso server! ajude-o a crescer',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, globalConfigs }) {
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('<:cafetao:776957317802360853> Vote no nosso server!')
          .setDescription('Esse [server](https://discord.gg/MBtcscjmEX "Link para entrar no servidor") foi feito em homenagem ao mestre, pode ter outros servers e comunidades mas ainda assim esse pode existir...então, se quiser nos ajudar..')
          .setThumbnail('https://pbs.twimg.com/media/EfJz-cSWAAAHx-R.jpg:large')
          .setColor(globalConfigs.colors[0])
      ],
      components: [
        new MessageActionRow({ components: [
          new MessageButton({
            label: "Top.gg",
            style: "LINK",
            url: "https://top.gg/servers/776933942816538635/vote",
            emoji: "<:kk:801133388856950836>"
          })
        ]})
      ]
    })
  }
}