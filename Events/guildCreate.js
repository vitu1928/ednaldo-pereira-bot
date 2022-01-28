module.exports = class extends Event {
  constructor(client) {
    super("guildCreate", client)
  }
  
  async execute(guild, client, configs) {
    async function firstTime() {
      client.interactions.each(async ({ name, beta }) => {
        if (beta || ['dbl'].includes(name)) return;
        await configs.run(`INSERT INTO \`${guild.id}\` (guild_id, command, enabled) VALUES (
          "${guild.id}",
          "${name}",
          "1"
        )`)
      }); 
    }  

    try {
      await firstTime()

      const linkBot = await client.generateInvite({
        permissions: client.commands.filter(c => c.permissions).map(a => a.permissions).flat()
      })

      if (!guild.systemChannel) return;
      const hora = new Date().getHours()
      await db.exec(`CREATE TABLE IF NOT EXISTS \`${guild.id}\` (
        guild_id varchar(20),
        command VARCHAR(10) NOT NULL,
        enabled BOOLEAN NOT NULL
      )`)

      await guild.systemChannel.send(
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
                { name: "Comandos", value: `${client.commands.size}`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                { name: "Links", value: `[Ednaldo Pereira server](https://discord.gg/VRJC4V9zmA "Ednaldo Pereira discord server")\n[Ednaldo Pereira bot](${linkBot})`, inline: true }
            ],
            image: {
              url: "https://c.tenor.com/hRyeNMzgoZsAAAAM/ednaldopereira-ednaldopereiramb.gif"
            },
            color: '#2F3136',
            footer: {
              text: `Online desde ${new Date(client.readyTimestamp).toLocaleString(guild.preferredLocale||'pt-br')}`
            }
          })
      )
    } catch(e) {
      console.error(e)
    }
  }
}
