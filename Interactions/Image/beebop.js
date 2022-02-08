const Interaction = require("../../Structures/Interaction")
const { MessageAttachment } = require("discord.js")
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
          type: "STRING",
          required: true
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

    const url = 'https://cdn.discordapp.com/attachments/807026989621313578/830289892219158528/beep.png'

    const canvas = createCanvas(1366, 768)
    const ctx = canvas.getContext('2d')
    const bg = await loadImage(url)
    ctx.drawImage(bg, 0, 0)
    
    let textos = args.getString("text").split('')
    let texto_total = []
    let longitud_maxima = 25;
    for (let i = 0; i <= textos.length; i++) {
      texto_total.push(textos[i])
      if (i === longitud_maxima) {
        texto_total.push('\n')
        longitud_maxima = longitud_maxima + 30
      }
    }

    ctx.font = '49px pixelGrunge'
    ctx.fillStyle = '#421d19'
    ctx.fillText(texto_total.join(''), 254, 576)

    return await interaction.followUp({
      files: [
        new MessageAttachment(canvas.toBuffer(), 'beepbop.png')
      ]
    })
  }
}