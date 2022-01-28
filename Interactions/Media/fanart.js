const Interaction = require('../../Structures/Interaction.js')
const { MessageEmbed } = require('discord.js')

module.exports = class FanartInteraction extends Interaction {
  constructor() {
    super("fanart", {
      type: 1,
      description: 'Ver uma linda fanart do mestre',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, fanarts: db }) {
    try {
      const { id } = interaction.user
      const list = require('./json/fanarts.json')
      
      await db.exec(`CREATE TABLE IF NOT EXISTS \`${interaction.user.id}\` (
        id INTEGER AUTO_INCREMENT,
        valor int NOT NULL,
        PRIMARY KEY (id)
      )`) // VARCHAR(64) to int
      
      let row = await db.get(`SELECT * FROM \`${id}\``)
      if (!row?.valor) Array.from({ length: list.length }, (a, i) => i).sort(() => 0.5 - Math.random())
      .forEach(async a => await db.run(`INSERT INTO \`${id}\` (valor) VALUES ('${a}')`))

      row = await db.get(`
        SELECT valor, id 
        FROM \`${id}\` 
        ORDER BY RANDOM()  
        LIMIT 1  
      `)

      await interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Fanart')   
            .setURL(list[row.valor])
            .setImage(list[row.valor]) 
            .setColor('#EA7200')
        ]
      })
      await db.run(`DELETE FROM \`${id}\` WHERE id=${row.id}`)
      return db.close()      
    } catch(e) {
      console.error(e)
      return interaction.reply("Ocorreu um erro!")
        .catch(() => interaction.channel.send("Ocorreu um erro!"))
    }
  }
}