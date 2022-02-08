const { loadImage, createCanvas } = require("canvas")
const { MessageAttachment } = require("discord.js")

const Interaction = require("../../Structures/Interaction")
const Util = require("../../Utils/util.js")

module.exports = class DripInteraction extends Interaction { 
  constructor() { 
    super("drip", {
      type: 1,
      description: 'Drip uma imagem',
      defaultPermission: true,
      options: [
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

    const img = await loadImage(await Util.getImage(interaction, args, client))

    const canvas = createCanvas(867, 892)
    const ctx = canvas.getContext('2d')
    const background = await loadImage('https://media.discordapp.net/attachments/776941533987209227/829874637114310677/image-removebg-preview.png?width=415&height=428');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
     //ctx.beginPath()
     //ctx.arc(350, 150, 100, 0, Math.PI * 2, true);
     //ctx.clip()
     //ctx.closePath()

    ctx.drawImage(img, 350, 150, 205, 205)

    return await interaction.followUp({
      files: [
        new MessageAttachment(canvas.toBuffer(), `Drip${interaction.user.username}.jpg`)
      ]
    })
  }
}