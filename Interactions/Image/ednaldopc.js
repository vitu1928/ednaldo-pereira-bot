const { loadImage, createCanvas } = require("canvas")
const { AttachmentBuilder } = require("discord.js")

const Interaction = require("../../Structures/Interaction")
const Util = require("../../Utils/util.js")

module.exports = class EdnaldopcInteraction extends Interaction { 
  constructor() { 
    super("ednaldopc", {
      type: 1,
      description: "Coloque uma imagem no pc do mestre",
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
          description: 'Imagem o que Ednaldo está vendo?',
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
    
    const canvas = createCanvas(1100, 800)
    const ctx = canvas.getContext("2d")
    ctx.transform(1, 0.1, 0, 1, 0, 0)
    //2: angulo da reta, diagonal direita(horizontal para cima)
    //3: O contrário do anterior, uma reta contrária(vertical esquerda). 

    ctx.drawImage(img, 175, 55, 200, 300)
    //1°param: lados? Quanto maior mais para a direita
    //2°param: cima e baixo? Quanto maior mais para baixo
    //3°param: zoom?
    //4°param: Um empurro de baixo para cima (vertical).  

    ctx.resetTransform()//Destransformando para poder colocar o background 

    const background = await loadImage(
      "https://media.discordapp.net/attachments/776941533987209227/831327385642598507/image_1.png"
    )

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    return await interaction.followUp({
      files: [
        new AttachmentBuilder(
          canvas.toBuffer(),
          { name: `${interaction.user.username}_ednaldopc.jpg`}
        )
      ]
    })
  }
}