const Interaction = require('../../Structures/Interaction.js')
const { MessageEmbed } = require('discord.js')

module.exports = class ServerInfoInteraction extends Interaction {
  constructor() {
    super("serverinfo", {
      type: 1,
      description: 'Informações sobre o servidor que foi executado o comando',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, args, client }) {
    const iG = interaction.guild
    
    return await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("Server info")
          .addField("Nome do server 🎗️", `${iG.name}`)
          .addField("Id do server 🆔", `${iG.id}`, true)
          .addField("Patrão do server 👑", `${iG.owner}`, true)
          .addField("Membros 👥", `${iG.memberCount}`, true)
          .addField("Núm. de cargos do server 🔐", `${iG.roles.cache.size}`, true)
          .addField("Canais 💬", `  ${iG.channels.cache.filter(r => r.type === "text").size} Texto
            ${iG.channels.cache.filter(r => r.type === "voice").size} Voz`, true)
          .addField("Região do server 🌍", `${iG.region}`, true)  
          .addField("Level de verificação 📑", `${iG.verificationLevel}`, true)
          .addField("Criado em 📆 ", `${iG.createdAt.toLocaleString('pt-br')}`, true)
          .addField("Boosts ✨", `${iG.premiumSubscriptionCount}`, true)
          .addField("Emojis ☺", `${iG.emojis.cache.size}`, true)
          .setColor("#2F3136")
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setImage(interaction.guild.bannerURL({ format: 'png' }) ?? "")
      ]
    })
  }
}