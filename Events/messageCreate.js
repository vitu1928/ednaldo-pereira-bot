const Event = require('../Structures/Event.js')
const { Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class extends Event {
  constructor(client) {
    super("messageCreate", client, true)
  }

  /**
   * @param {Message} message
   */       
  async execute(message, client) {
    let first = message.mentions.users.first()
    if (first && first.id === '782964490047979530') 
      await message.reply({
        embeds: [
          new MessageEmbed({
            title: "Precisa de ajuda?",
            description: `Os comandos agora são em slash<:Cansado:808901592706580510>, use \`/\` para ver os comandos disponíveis de todos os bots<:Pog:808225356926550026>`,
            fields: [
              {
                name: "Meus comandos não aparecem?",
                value: "Caso os meus comandos não apareçam, me permita criar comandos slash clicando no link abaixo!"
              }
            ],
            color: '#2F3136'
          }) 
        ],
        components: [
          new MessageActionRow({
            components: [
              new MessageButton({
                label: "Permitir a criação de slash commands",
                url: "https://discord.com/api/oauth2/authorize?client_id=782964490047979530&scope=applications.commands",
                style: "LINK",
                emoji: "<:HeHe:808898963927203850> "
              })
            ]
          })
        ]
      })
  }
}
