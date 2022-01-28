const { MessageAttachment } = require("discord.js")
const { createCanvas, loadImage } = require("canvas") 
const Util = require("../../Utils/util.js") 
const Interaction = require('../../Structures/Interaction.js')

module.exports = class AmogusInteraction extends Interaction {
  constructor() {
    super("amogus", {
      type: 1,
      description: 'sussy sus',
      defaultPermission: true,
      options:[
        {
          name: 'membro',
          description: 'Membro para sus',
          type: "USER",
          required: false
        },
        {
          name: 'link',
          description: 'Link da imagem para sus',
          type: "STRING",
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext("2d")
    const img = await loadImage(Util.getImage(interaction, args))
    const background = await loadImage(
    "https://cdn.discordapp.com/attachments/802613142751805471/829448447303221327/amogus_rap_editado.png")
    ctx.drawImage(img, 270, 100, 270, 250)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    const attachment = new MessageAttachment(canvas.toBuffer(), `${interaction.user.username}_amogus.png`)

    return await interaction.reply({
      files: [attachment]
    })
  }
}