const { AttachmentBuilder, EmbedBuilder } = require("discord.js")
const { loadImage, createCanvas, registerFont } = require('canvas')

const Event = require('../Structures/Event.js')
module.exports = class extends Event { 
  constructor(client) {
    super('guildMemberRemove', client)
  }
  
  async execute(member) {
    registerFont('./Assets/Fonts/Gobold Bold.otf', { family: 'Gobold Bold' })
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d')
      let fontSize = 70;
    
      do {
        ctx.font = `${fontSize -= 10}px Gobold Bold`;
      } while (ctx.measureText(text).width > canvas.width - 300);
    
      return ctx.font;
    };
  
    const channel = member.guild.channels.cache.find(ch => ch.name === 'adeus');
    if (!channel) return;
  
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
  
    const background = await loadImage('./Assets/Images/adeus.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  
    ctx.strokeStyle = '#74037b'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  
    ctx.font = '35px "Gobold Bold"'
    ctx.fillStyle = '#EACF08'
    ctx.strokeStyle = "#050F2A"
    ctx.fillText('Adeus jovem pog', canvas.width / 2.5, canvas.height / 3.5)
  
    ctx.font = applyText(canvas, `${member.displayName}!`)
    ctx.fillStyle = '#8B7C10'
    ctx.fillText(`${member.displayName}`, canvas.width / 2.5, canvas.height / 1.8);
  
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
  
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'jpg' }))
    ctx.drawImage(avatar, 25, 25, 200, 200)
  
    const attachment = new AttachmentBuilder(canvas.toBuffer(), 'adeus.png')
  
    return await channel.send({
      embeds: [
        new EmbedBuilder({
          description: `Você sempre estará conosco, ${member.displayName}`,
          image: {
            url: 'attachment://adeus.png'
          }
        })
      ],
      files: [attachment]
    })
  }
}