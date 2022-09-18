const Interaction = require('../../Structures/Interaction.js')
const { Embed, ActionRow, ButtonComponent } = require('discord.js')


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
        new Embed({
          title: "<:cafetao:776957317802360853> Vote no nosso server!",
          description: 'Esse [server](https://discord.gg/MBtcscjmEX "Link para entrar no servidor") foi feito em homenagem ao mestre, pode ter outros servers e comunidades mas ainda assim esse pode existir...então, se quiser nos ajudar..',
          thumbnail: {
            url: 'https://pbs.twimg.com/media/EfJz-cSWAAAHx-R.jpg:large'
          },
          hexColor: globalConfigs.colors[0],
        })         
      ],
      components: [
        new ActionRow({ 
          components: [
            new ButtonComponent({
              label: "Top.gg",
              style: "LINK",
              url: "https://top.gg/servers/776933942816538635/vote",
              emoji: "<:kk:801133388856950836>"
            }),
            new ButtonComponent({
              label: "Bot discordbotlist.com",
              style: "LINK",
              url: "https://discordbotlist.com/bots/ednaldo-pereira",
              emoji: "<:Banido:808228534970613801>" 
            }),
            new ButtonComponent({
              label: "Bot Top.gg",
              style: "LINK",
              url: "https://top.gg/bot/782964490047979530/vote",
              emoji: "<:Banido:808228534970613801>"
            }),
            new ButtonComponent({
              label: "Bot discord.boats",
              style: "LINK",
              url: "https://discord.boats/bot/782964490047979530",
              emoji: "<:Banido:808228534970613801>"
            }),
          ]
        })
      ]
    })
  }
}