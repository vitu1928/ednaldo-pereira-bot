const { AttachmentBuilder } = require("discord.js")
const Interaction = require('../../Structures/Interaction.js')
const Util = require("../../Utils/util.js") 
const { createCanvas, loadImage } = require("canvas") 

module.exports = class AmogusInteraction extends Interaction {
  constructor() {
    super("amogus", {
      type: 1,
      description: 'sussy sus',
      defaultPermission: true,
      options: [
       {
          name: 'imagem',
          description: 'Menção de um usuário, link, última imagem do chat (limite: 100 mensagens)',
          type: 3, // String
          required: false
        },
        {
          name: 'imagem_anexo',
          description: 'Imagem SUS',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    await interaction.deferReply()

    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext("2d")
    const img = await loadImage(await Util.getImage(interaction, args, client))
    const background = await loadImage("https://cdn.discordapp.com/attachments/802613142751805471/829448447303221327/amogus_rap_editado.png")
    ctx.drawImage(img, 270, 100, 270, 250)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: `${interaction.user.username}_amogus.png`})

    return await interaction.followUp({
      files: [attachment]
    })
  }
}