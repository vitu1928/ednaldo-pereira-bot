const Interaction = require("../../Structures/Interaction")
const { MessageAttachment } = require("discord.js")
const Util = require("../../Utils/util.js") 
const { createCanvas, loadImage } = require("canvas")

module.exports = class BandeiraInteraction extends Interaction { 
  constructor() { 
    super("bandeira", {
      type: 1,
      description: 'Coloque a imagem de algo na bandeira do mestre',
      defaultPermission: true,
      options:[
        {
          name: 'imagem',
          description: 'Menção de um usuário, link de uma imagem e caso não tenha nada vai buscar a última imagem do chat',
          type: "STRING",
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    await interaction.deferReply()
    
    const avatar = await loadImage(await Util.getImage(interaction, args, client))

    
    const canvas = createCanvas(800, 800)
    const ctx = canvas.getContext("2d")
      
    ctx.setTransform(1, 0, -0.3, 1, 0, 0)
    //2: angulo da reta, diagonal direita
    //3: O contrário do anterior, uma reta contrária. 
    
    ctx.drawImage(avatar, 195, 270, 605, 480)
    //1°param: lados? Quanto maior mais para a direita
    //2°param: cima e baixo? Quanto maior mais para baixo
    //3°param: zoom? 

    ctx.resetTransform()
    //Destransformando para poder colocar o background 

    const background = await loadImage("https://media.discordapp.net/attachments/811202606038122517/831141122368995368/EQIPgg3WoAAKG2Z.png?width=422&height=427")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    
    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      `${interaction.user.username}_bandeira.jpg`
    );
    return await interaction.followUp({
      files: [ attachment ]
    })
  }
}