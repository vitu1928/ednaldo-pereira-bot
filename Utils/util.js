const { Interaction, CommandInteractionOptionResolver } = require('discord.js')
const XMLHttpRequest = require('xmlhttprequest')

module.exports = class Utils {
  /**
   * @param { Interaction } interaction
   * @param { CommandInteractionOptionResolver } args
   * @returns { String } - Link
   */
  static async getImage(interaction, args) {
    try {
      if (!interaction) throw new Error("Cadê a interação!?")
      if (!args) throw new Error("Cadê os args!?")
      
      let membro = args.getUser('membro'), link = args.getString('link'), imgFetch;

      if (!membro && !link) {
        imgFetch = await interaction.channel.messages.fetch({ limit: 100 })
        imgFetch = imgFetch.filter(x => x.attachments.size > 0).first().attachments.map(x => x.url)[0]
      } else if (!membro) {
        if (!this.imageExists(args.getString('link'))) throw new Error("Link inválido")
      }
      return (membro?.displayAvatarURL() ?? link) ?? imgFetch
    } catch(e) {
      return e
    }
  }
  
  static imageExists(image_url){
    let http = new XMLHttpRequest();

    http.open('GET', image_url, false);
    http.send();

    return http.status != 404;
  }
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
            else throw new Error()
        } catch(e) {
            res.push({
                status: 404,
                url: arrImageLinkOrLinkImage[i],
                index: i
            })
        } finally {
            res;
        }
    ++i
    } while(i != arrImageLinkOrLinkImage.length)
    return res;
  }
}