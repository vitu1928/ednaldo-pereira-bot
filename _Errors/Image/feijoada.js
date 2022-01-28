const { MessageAttachment } = require("discord.js")
const { createCanvas, loadImage } = require("canvas") 
const Util = require("../../Utils/util.js") 
const arrayDeEdnaldos = require("./json/ednaldos.json") 
const Interaction = require('../../Structures/Interaction.js')

module.exports = class NameInteraction extends Interaction {
  constructor() {
    super("feijoada", {
      type: 1,
      description: '? ? ? ? ? ? ?',
      defaultPermission: true,
      options: [
        {
          name: 'membro',
          description: 'Membro para usar em uma edição aleatória',
          type: "USER",
          required: false
        },
        {
          name: 'link',
          description: 'Link da imagem para usar em uma edição aleatória',
          type: "STRING",
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    interaction.deferReply()
    
    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext('2d')
    const img = await loadImage(Util.getImage(interaction, args))
    const background = await loadImage(arrayDeEdnaldos[~~(Math.random() * arrayDeEdnaldos.length)])

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const attachment = new MessageAttachment(canvas.toBuffer(), `feijoada_${interaction.user.username}.jpg`)
    return await interaction.followUp({
      files: [attachment]
    })
  }
}