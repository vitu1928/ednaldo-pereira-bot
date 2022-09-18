const Event = require('../Structures/Event.js')
const { CommandInteractionOptionResolver } = require('discord.js')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const globalConfigs = require('../globalConfigs.json')

module.exports = class extends Event {
  constructor(client) {
    super("interactionCreate", client)
  }

  async execute(interaction, client) {
    const fanarts = await open({
      filename: require.main.path + '/Databases/Fanart.sqlite',
      driver: sqlite3.Database
    }),
    fotos = await open({
      filename: require.main.path + '/Databases/Fotos.sqlite',
      driver: sqlite3.Database
    }),
    configs = await open({
      filename: require.main.path + '/Databases/Configs.sqlite',
      driver: sqlite3.Database
    });

    const interactionCommand = client.interactions.get(interaction.commandName)
    if (!interactionCommand) return;

    let args;
    if (interaction.options) args = interaction.options
    try {
      await interactionCommand.execute({ 
        interaction,
        args,
        client,
        fanarts,
        fotos,
        configs,  
        globalConfigs
      })
    } catch (e) {
      console.error(e)
      
      let mes = {
        content: `Ocorreu um erro! <:Bravo:808443772689317979>`,
        ephemeral: true
      }

      if (interaction.deferred) interaction.followUp(mes)
      else interaction.reply(mes)
    }
  }
}