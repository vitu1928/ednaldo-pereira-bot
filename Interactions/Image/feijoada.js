const { AttachmentBuilder } = require("discord.js")
const { createCanvas, loadImage } = require("canvas") 

const Util = require("../../Utils/util.js") 
const arrayDeEdnaldos = require("./json/ednaldos.json") 
const Interaction = require('../../Structures/Interaction.js')

module.exports = class FeijoadaInteraction extends Interaction {
  constructor() {
    super("feijoada", {
      type: 1,
      description: '? ? ? ? ? ? ?',
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
          description: 'Imagem f e i j o a d a',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    await interaction.deferReply()
    
    const background = await loadImage(await Util.getImage(interaction, args, client))
    
    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext('2d')
    const ednaldo = await loadImage(arrayDeEdnaldos[~~(Math.random() * arrayDeEdnaldos.length)])
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(ednaldo, 0, 0, canvas.width, canvas.height)

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {name: `feijoada_${interaction.user.username}.jpg`})
    
    return await interaction.followUp({
      files: [attachment]
    })
  }
}
