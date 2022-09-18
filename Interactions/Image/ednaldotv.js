const { loadImage, createCanvas } = require("canvas")
const { AttachmentBuilder } = require("discord.js")

const Interaction = require("../../Structures/Interaction")
const Util = require("../../Utils/util.js")

module.exports = class EdnaldotvInteraction extends Interaction { 
  constructor() { 
    super("ednaldotv", {
      type: 1,
      description: "Coloque uma imagem na tv do mestre",
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
    

    const canvas = createCanvas(1200, 800)
    const ctx = canvas.getContext("2d")
    const background = await loadImage(
      "https://media.discordapp.net/attachments/785694303863046197/831212248730566727/ednaldo_tv.png?width=405&height=303"
    );

    ctx.drawImage(img, 630, 40, 390, 240)
    //1°param: lados? Quanto maior mais para a direita
    //2°param: cima e baixo? Quanto maior mais para baixo
    //3°param: zoom?
    //4°param: Um empurro de baixo para cima (vertical). Quanto maior mais  esticado

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    return await interaction.followUp({
      files: [
        new AttachmentBuilder(
          canvas.toBuffer(),
          { name: `${interaction.user.username}_ednaldotv.jpg`}
        )
      ]
    })
  }
}