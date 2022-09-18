const Interaction = require('../../Structures/Interaction.js')
const { Embed } = require('discord.js')

module.exports = class FotoInteraction extends Interaction {
  constructor() {
    super("foto", {
      type: 1,
      description: 'Ver uma linda foto do mestre',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, fotos: db }) {
    try {
      const { id } = interaction.user
      const list = require('./json/fotos.json')

      await db.run(`CREATE TABLE IF NOT EXISTS \`${interaction.user.id}\` (
        id INTEGER AUTO_INCREMENT,
        valor int NOT NULL,
        PRIMARY KEY (id)
      )`)
      
      let row = await db.get(`SELECT * FROM \`${id}\``)

      if (!row?.valor) Array.from({ length: list.length }, (a, i) => i).sort(() => 0.5 - Math.random())
        .forEach(async a => await db.run(`INSERT INTO \`${id}\` (valor) VALUES ('${a}')`))

      row = await db.get(`
        SELECT valor, id 
        FROM \`${id}\` 
        ORDER BY RANDOM ()  
        LIMIT 1  
      `)

      await interaction.reply({
        embeds: [
          new Embed({
            title: "Mestre Ednaldo Pereira e seu grandioso rosto",
            url: list[row.valor],
            image: { url: list[row.valor] },
            hexColor: "#EA7200"
          })
        ]
      })
      await db.run(`DELETE FROM \`${id}\` WHERE id=${row.id}`)
      return db.close()           
    } catch(e) {
      console.error(e)
      return await interaction.reply("Ocorreu um erro!")
    }
  }
}