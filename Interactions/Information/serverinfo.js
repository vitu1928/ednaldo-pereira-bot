const Interaction = require('../../Structures/Interaction.js')
const { EmbedBuilder } = require('discord.js')

module.exports = class ServerInfoInteraction extends Interaction {
  constructor() {
    super("serverinfo", {
      type: 1,
      description: 'Informações sobre o servidor que foi executado o comando',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, client }) {
    const { guild: iG } = interaction
    
    return await interaction.reply({
      embeds: [
        new EmbedBuilder({
          title: "Server info",
          fields: [
            {
              name: "Nome do server 🎗️", 
              value: `${iG.name}`
            },
            {
              name: "Id do server 🆔", 
              value: `${iG.id}`, 
              inline: true
            },
            {
              name: "Patrão do server 👑", 
              value: `${iG.owner}`, 
              inline: true
            },
            {
              name: "Membros 👥", 
              value: `${iG.memberCount}`, 
              inline: true
            },
            {
              name: "Núm. de cargos do server 🔐", 
              value: `${iG.roles.cache.size}`, 
              inline: true
            },
            {
              name: "Canais 💬",
              value: `${iG.channels.cache.filter(r => r.type === "text").size} Texto ${iG.channels.cache.filter(r => r.type === "voice").size} Voz`,
              inline: true
            },
            {
              name: "Região do server 🌍",
              value: `${iG.region}`,
              inline: true
            },
            {
              name: "Level de verificação 📑",
              value: `${iG.verificationLevel}`,
              inline: true
            },
            {
              name: "Criado em 📆 ",
              value: `${iG.createdAt.toLocaleString('pt-br')}`,
              inline: true
            },
            {
              name: "Boosts ✨",
              value: `${iG.premiumSubscriptionCount}`,
              inline: true
            },
            {
              name: "Emojis ☺" ,
              value: `${iG.emojis.cache.size}`,
              inline: true
            }
          ],
          color: 3092790,
          thumbnail: {
            url: interaction.guild.iconURL({ dynamic: true })
          },
          image: {
            url: interaction.guild.bannerURL({ format: 'png' }) ?? ""
          }
        })          
      ]
    })
  }
}