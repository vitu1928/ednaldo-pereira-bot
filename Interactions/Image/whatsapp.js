const Interaction = require("../../Structures/Interaction")
const { AttachmentBuilder } = require("discord.js")

const Util = require("../../Utils/util.js")
const { createCanvas, loadImage } = require("canvas")

module.exports = class WhatsappInteraction extends Interaction { 
  constructor() { 
    super("whatsapp", {
      type: 1,
      description: "zap zap??!! :flushed:",
      defaultPermission: true,
      options: [
        {
          name: 'imagem',
          description: 'Menção de um usuário, link de uma imagem e caso não tenha nada vai buscar a última imagem do chat',
          type: 3,
          required: false
        },
        {
          name: 'imagem_anexo',
          description: 'Imagem zapzaps',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
      await interaction.deferReply()

      const img = await loadImage(await Util.getImage(interaction, args, client))
      
      const canvas = createCanvas(800, 800)
      const ctx = canvas.getContext("2d")

      const background = await loadImage(
        "https://cdn.discordapp.com/attachments/821168411978629120/830951165943480359/whatsapp.png"
      )

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      return interaction.followUp({
        files: [
          new AttachmentBuilder(
            canvas.toBuffer(),
            { name: `${interaction.user.username}_whatsapp.jpg` }
          )
        ]
      })
    }
}