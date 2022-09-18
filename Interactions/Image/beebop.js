const Interaction = require("../../Structures/Interaction")
const { AttachmentBuilder } = require("discord.js")
const { createCanvas, loadImage, registerFont } = require("canvas")

const { resolve } = require('path')

module.exports = class BeebopInteraction extends Interaction { 
  constructor() {
    super("beebop", {
      type: 1,
      description: "a e i o o e e i a e ",
      defaultPermission: true,
      options:[
        {
          name: 'text',
          description: 'Texto para colocar na montagem, máximo de 92 caracteres',
          type: 3, // String
          required: true
        },
        {
          name: 'imagem_anexo',
          description: 'Imagem beebop',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }
  async execute({ interaction, args }) {

    if (args.getString("text").length > 92) return interaction.reply({
      content: 'Tamanho de texto excedido!',
      ephemeral: true
    })
    
    await interaction.deferReply()

    registerFont(resolve("./Assets/Fonts/PixelGrunge.ttf"), { family: "pixelGrunge" }) //Font pixel grunge

    const url = 'https://cdn.discordapp.com/attachments/807026989621313578/830289892219158528/beep.png',
      canvas = createCanvas(1366, 768),
      ctx = canvas.getContext('2d'),
      bg = await loadImage(url);
    ctx.drawImage(bg, 0, 0)
    
    let textos = args.getString("text").split(''),
      texto_total = [],
      longitud_maxima = 25;
    for (let i of textos) {
      texto_total.push(textos[i])
      if (texto_total.lenght+1 === longitud_maxima) {
        texto_total.push('\n')
        longitud_maxima = longitud_maxima + 30
      }
    }

    ctx.font = '49px pixelGrunge'
    ctx.fillStyle = '#421d19'
    ctx.fillText(texto_total.join(''), 254, 576)

    return await interaction.followUp({
      files: [
        new AttachmentBuilder(canvas.toBuffer(), { name: 'beepbop.png' })
      ]
    })
  }
}