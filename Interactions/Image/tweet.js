const { get } = require('axios')
const { MessageAttachment } = require("discord.js")
const { createCanvas, loadImage } = require('canvas')

const Interaction = require("../../Structures/Interaction")

module.exports = class TweetInteraction extends Interaction { 
  constructor() { 
    super("tweet", {
      type: 1,
      description: "Tweet algo em nome do mestre",
      defaultPermission: true,
      options:[
        {
          name: 'text',
          description: 'Texto para colocar na montagem',
          type: "STRING",
          required: true
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }
  
  async execute({ interaction, args, client }) {
      await interaction.deferReply()

      const canvas = createCanvas(1000, 500)
      const ctx = canvas.getContext('2d')

      const ednaldoCircleImg = await loadImage('https://media.discordapp.net/attachments/785694303863046197/936621220194029638/ednaldo-pereira-github.png')
    
      const text = args.getString('text')

      const { message } = (
          await get (
          encodeURI(`https://nekobot.xyz/api/imagegen?type=tweet&username=Ednaldo Pereira&text=${encodeURIComponent(text)}`), {
            responseType: 'json'
          }
        )
      ).data

      const tweetImg = await loadImage(message)

      ctx.drawImage(tweetImg, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(ednaldoCircleImg, 55, 50, 87, 87);

      return interaction.followUp({
        files: [ new MessageAttachment(canvas.toBuffer(), "tweet.png") ]
      })
  }
}