const { Interaction, CommandInteractionOptionResolver, MessageMentions } = require('discord.js')
const { XMLHttpRequest } = require('xmlhttprequest')

module.exports = class Util {
  /**
   * @param { Interaction } interaction
   * @param { CommandInteractionOptionResolver } args
   * @returns { String } - Link
   */
  static async getImage(interaction, args, client) {
    if (!interaction) throw new Error("Cadê a interação!?")
    if (!args) throw new Error("Cadê os args!?")
    
    const imagem = args.getString('imagem'),
      userMention = MessageMentions.USERS_PATTERN.exec(imagem)?.at(1),
      user = (userMention && client.users.cache.get(userMention)),
      link = this.check(imagem),
      isValidLink = link?.at(0).status !== 404;

    let res;

    if (!imagem) {
      var imgFetch = await interaction.channel.messages.fetch({ limit: 100 })
      imgFetch = imgFetch.filter(x => x.attachments.size > 0).first().attachments.at(0).url
    } 
    else if (userMention) res = user.displayAvatarURL({
      dynamic: false,
      format: 'png'
    })
    else if (!isValidLink) throw new TypeError("O Link informado não é válido") 
    else res = link.at(0).url

    return res ?? imgFetch
  }
  
  // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)

    /**
    * @param { String|Array<String> }
    * @example check(['https://images-ext-1.discordapp.net/external/Q-zf3QZF2ZhkZnvpzmv8RtxKATl5tvpVJDAcdbqgphA/%3Fwidth%3D569%26height%3D427/https/media.discordapp.net/attachments/776934218206412830/776975140499226645/CIMG0016.JPG'],
  'https://images-ext-1.discordapp.net/external/Q-zf3QZF2ZhkZnvpzmv8RtxKATl5tvpVJDAcdbqgphA/%3Fwidth%3D569%26height%3D427/https/media.discordapp.net/attachments/776934218206412830/776975140499226645/CIMG0016.JPG')
    * @returns { Array<String> } - Array de links que não deram 404
  */
  static check(arrImageLinkOrLinkImage) {
    arrImageLinkOrLinkImage = Array.from([...arguments].flat())
    let res = [], http = new XMLHttpRequest(), i = 0;
    do {
        try {
            http.open('HEAD', arrImageLinkOrLinkImage[i], false)
            http.send()
            console.log(http.status, i)
            if (http.status != 404) res.push({
                status: http.status,
                url: arrImageLinkOrLinkImage[i],
                index: i
            });
            else throw new Error("Error 404")
        } catch(e) {
            res.push({
                status: 404,
                url: arrImageLinkOrLinkImage[i],
                index: i
            })
        } finally {  ++i }
       
    } while(i != arrImageLinkOrLinkImage.length)
    return res;
  }
}