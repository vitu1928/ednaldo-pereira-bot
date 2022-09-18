const { createCanvas, loadImage, registerFont } = require("canvas")
const { AttachmentBuilder } = require("discord.js")

const Interaction = require("../../Structures/Interaction")
const Util = require("../../Utils/util.js")

const { resolve } = require('path')

module.exports = class EpicInteraction extends Interaction { 
  constructor() { 
    super("épico", {
      type: 1,
      description: "Apenas épico",
      defaultPermission: true,
      options: [
        {
          name: 'título',
          description: 'Texto para colocar na montagem, máximo de 32 caracteres',
          type: 3,
          required: true
        },
        {
          name: 'text',
          description: 'Texto para colocar na montagem',
          type: 3,
          required: false
        },
        {
          name: 'imagem',
          description: 'Menção de um usuário, link de uma imagem e caso não tenha nada vai buscar a última imagem do chat',
          type: 3,
          required: false
        },
        {
          name: 'imagem_anexo',
          description: 'Imagem Épica',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }
  async execute({ interaction, args, client }) {
    registerFont(resolve("./Assets/Fonts/times.ttf"), { family: "timesbd" }) //Font times new roman
    registerFont(resolve("./Assets/Fonts/IHATCS__.TTF"), { family: "comic" }) //Font comic sans
    await interaction.deferReply()
  
    const imagem = await loadImage(await Util.getImage(interaction, args, client))
    
    let título = args.getString('título')
    let texto = args.getString('text')

    const canvas = createCanvas(650, 505)
    const ctx = canvas.getContext('2d')

    let fundo = await loadImage("https://media.discordapp.net/attachments/785694303863046197/843589600534069298/image.png?width=476&height=370")

    if (título .length > 32) return interaction.followUp('Título muito grande!')
    
    ctx.drawImage(imagem, 30, 30, 590, 350)
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)

    if (texto) {
      let textos = texto.split('')
      let texto_total = []
      let longitud_maxima = 50;

      for (let i = 0; i <= textos.length; i++) {
        texto_total.push(textos[i])
        if (i === longitud_maxima) {
          texto_total.push('\n')
          longitud_maxima += 25
        }
      }

      ctx.font = '20px comic'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(texto_total.join(""), 325, 460)
    }
 
    ctx.font = '40px timesbd'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(título, 325, 425)

    return interaction.followUp({
      files: [
        new AttachmentBuilder(canvas.toBuffer(), { name: 'epic.png' })
      ]
    })
  }
}
