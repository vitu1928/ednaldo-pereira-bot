const { AttachmentBuilder } = require("discord.js")
const { createCanvas, loadImage } = require("canvas") 

const Util = require("../../Utils/util.js") 
const Interaction = require('../../Structures/Interaction.js')

module.exports = class AreyouwinningdadInteraction extends Interaction { 
  constructor() { 
    super("areyouwinningdad", {
      type: 1,
      description: 'Are you winning daddy?',
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
          description: 'Imagem winning?',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }
  async execute({ interaction, args, client }){
    await interaction.deferReply()

    const img = await loadImage(await Util.getImage(interaction, args, client))

    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext("2d")

    const background = await loadImage(
    "https://media.discordapp.net/attachments/776941533987209227/855948664878006302/image.png?width=372&height=369");

    ctx.drawImage(img, 130, 580, 370, 310)
    ctx.drawImage(background, 0, 0, canvas.width,   canvas.height)

    return await interaction.followUp({
      files: [
        new AttachmentBuilder(canvas.toBuffer(), { name: `${interaction.user.username}_amogus.jpg` })
      ]
    })
  }
}