const Interaction = require('../../Structures/Interaction.js')
const { MessageActionRow, MessageButton, Permissions } = require("discord.js")

module.exports = class KickInteraction extends Interaction {
  constructor() {
    super("Kick author", {
      type: 3,
      defaultPermission: true
    })
  }

  async execute({ interaction }) {
    const message = interaction.options.resolved.messages?.first()
    const aSerKickado = interaction.member.guild.members.cache.get(message.author.id)
    if (!message || !aSerKickado) return interaction.reply({ content: 'Houve algum erro na hora de pegar o author da mensagem', ephemeral: true })

    if (aSerKickado.user.id === interaction.guild.ownerId) {
      return interaction.reply({ content: 'Não seja idiota! Ele é o adm', ephemeral: true })
    } else if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({ content: 'Você não tem permissão para chutar membros!', ephemeral: true })
    } else if (!interaction.member.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply({ content: 'Eu não tenho permissão para chutar membros!', ephemeral: true })
    } else if (!aSerKickado.kickable) {
      return interaction.reply({ content: 'Meu cargo é inferior ao membro que você quer chutar!', ephemeral: true })
    }

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('sim')
        .setLabel("Sim")
        .setStyle('SUCCESS')
        .setEmoji("✅"),

      new MessageButton()
        .setCustomId('não')
        .setLabel("Não")
        .setStyle('DANGER')
        .setEmoji("❌"),
    )
    let i = await interaction.reply({ ephemeral: true, content: `Quer mesmo chutar **${aSerKickado.user.username}** (${aSerKickado.user.id})?`, components: [row] })

    const filter = (interactionE) => (interactionE.customId === 'sim' || interactionE.customId === 'não') && interactionE.user.id === interaction.user.id

    let channel = interaction.channel
    //guild.channels.cache.get(interaction.channelId)
    const collector = channel?.createMessageComponentCollector({
      filter, max: 1
    })
    collector.on('collect', async i => {
      if (i.customId === 'sim') {
        await i.update({
          content: "Chutado com sucesso!",
          components: []
        })
        collector.stop()
        return await aSerKickado.kick({ reason: "Chutado sem motivo" })
      } else if (i.customId === 'não') {
        collector.stop()
        return await i.update({
          content: "Cancelado :x:",
          components: []
        })
      }
    })
  }
}