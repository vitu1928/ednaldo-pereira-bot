const { MessageEmbed } = require('discord.js')

module.exports = class extends Event {
  constructor(client) {
    super("guildCreate", client)
  }
  
  async execute(guild, client) {
    try {
      if (!guild.systemChannel) return;
      const hora = new Date().getHours()
      await guild.systemChannel.send({
        embeds: [
          new MessageEmbed({
            title: hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite",
            description: "<:Deus:808091805743579226> bem galera, agora sou um bot do discord",
            author: {
              name: "Ednaldo Pereira",
              iconURL: client.user.avatarURL({ format: "png", size: 32}),
            },
            fields: [
                { name: "Usuários", value: client.users.cache.size.toString(), inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                { name: "Guildas", value: client.guilds.cache.size.toString(), inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                // { name: "Comandos", value: `${client.commands.cache.size}`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                { name: "Links", value: `[Ednaldo Pereira server](https://discord.gg/VRJC4V9zmA "Ednaldo Pereira discord server")`, inline: true }
            ],
            image: {
              url: "https://c.tenor.com/hRyeNMzgoZsAAAAM/ednaldopereira-ednaldopereiramb.gif"
            },
            color: '#2F3136',
            footer: {
              text: `Online desde ${new Date(client.readyTimestamp).toLocaleString(guild?.preferredLocale||'pt-br')}`
            }
          })
        ]
      })
    } catch(e) {
      console.error(e)
    }
  }
}
