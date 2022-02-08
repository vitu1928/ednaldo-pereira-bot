const petPetGif = require("pet-pet-gif")
const { MessageAttachment } = require("discord.js")

const Interaction = require("../../Structures/Interaction")
const Util = require('../../Utils/util.js')

module.exports = class PetpetInteraction extends Interaction { 
  constructor() { 
    super("petpet", {
      type: 1,
      description: 'Faça petpet com uma imagem',
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
    
    const animatedGif = await petPetGif(img, {
      resolution: 128,
      delay: 30,
      backgroundColor: null
    })
    
    return await interaction.followUp({
      files: [
        new MessageAttachment(animatedGif, `petpet_${interaction.user.username}.jpg`)
      ]
    })
  }
}