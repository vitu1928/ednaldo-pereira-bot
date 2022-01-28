const Interaction = require('../../Structures/Interaction.js')
const { MessageActionRow, MessageButton, Permissions } = require("discord.js")

module.exports = class BanInteraction extends Interaction {
  constructor() {
    super("Ban author", {
      type: 3,
      defaultPermission: true
    })
  }

  async execute({ interaction }) {
    const message = interaction.options.resolved.messages?.first()
    const aSerBanido = interaction.member.guild.members.cache.get(message.author.id)
    if (!message || !aSerBanido) return interaction.reply({ content: 'Houve algum erro na hora de pegar o author da mensagem', ephemeral: true })

    if (aSerBanido.user.id === interaction.guild.ownerId) {
      return interaction.reply({ content: 'Não seja idiota! Ele é o adm', ephemeral: true })
    } else if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply({ content: 'Você não tem permissão para banir membros!', ephemeral: true })
    } else if (!interaction.member.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply({ content: 'Eu não tenho permissão para banir membros!', ephemeral: true })
    } else if (!aSerBanido.bannable) {
      return interaction.reply({ content: 'Meu cargo é inferior ao membro que você quer banir!', ephemeral: true })
    }

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('ban-sim')
        .setLabel("Sim")
        .setStyle('SUCCESS')
        .setEmoji("✅"),

      new MessageButton()
        .setCustomId('ban-não')
        .setLabel("Não")
        .setStyle('DANGER')
        .setEmoji("❌"),
    )
    let i = await interaction.reply({ ephemeral: true, content: `Quer mesmo banir **${aSerBanido.user.username}** (${aSerBanido.user.id})?`, components: [row] })
    console.log(i)

    const filter = (interactionE) => (interactionE.customId === 'ban-sim' || interactionE.customId === 'ban-não') && interactionE.user.id === interaction.user.id

    let channel = interaction.channel
    const collector = channel?.createMessageComponentCollector({
      filter, max: 1
    })
    collector.on('collect', async i => {
      if (i.customId === 'ban-sim') {
        await i.update({
          content: "Banido com sucesso!",
          components: []
        })
        collector.stop()
        return await aSerBanido.ban({ reason: "Banido sem motivo" })
      } else if (i.customId === 'ban-não') {
        collector.stop()
        return await i.update({
          content: "Cancelado :x:",
          components: []
        })
      }
    })
  }
}