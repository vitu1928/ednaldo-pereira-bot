const Interaction = require("../../Structures/Interaction")
const { MessageAttachment } = require("discord.js")

const Util = require('../../Utils/util.js')

module.exports = class MoreiraInteraction extends Interaction { 
  constructor() { 
    super("moreira", {
      type: 1,
      description: 'Coloca uma imagem na parede do ricardo e moreira',
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

  async execute({ interaction, client, args }) {
    await interaction.deferReply()
    
    let img = await Util.getImage(interaction, args, client)
    
    img = `https://api.popcatdev.repl.co/uncover?image=${encodeURIComponent(img)}`
    return await interaction.followUp({
      files: [
        new MessageAttachment(img, `moreiraedit.jpg`)
      ]
    })
  }
}