const { AttachmentBuilder } = require("discord.js")
const { get } = require('axios')

const Interaction = require("../../Structures/Interaction")
const Util = require('../../Utils/util.js')

module.exports = class RecaptchaInteraction extends Interaction { 
  constructor() { 
    super("recaptcha", {
      type: 1,
      description: 'Are you a robot?',
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
          description: 'Imagem ao recaptcha',
          type: 11, // Attachment
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }
  
  async execute({ interaction, args, client }) {
    await interaction.deferReply()
    
    const img = await Util.getImage(interaction, args, client)

    const { message } = (
        await get (
        `https://nekobot.xyz/api/imagegen?type=captcha&url=${encodeURIComponent(img)}&username=${encodeURIComponent(interaction.user.tag)}`, {
          responseType: 'json'
        }
      )
    ).data

    return interaction.followUp({
      files: [ new AttachmentBuilder(message, { name: "captcha.png" }) ]
    })
  }
}