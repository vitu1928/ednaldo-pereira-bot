const Event = require('../Structures/Event.js')
require('colors')

module.exports = class extends Event {
  constructor(client) {
    super("ready", client, true)
  }

  async execute(client) {
    await client.loadInteractions()
    console.log(`
      O bot ${client.user.username.bold} iniciou com:
      ${String(client.users.cache.size).green} users
      ${String(client.guilds.cache.size).yellow} guildas
      ${String(client.ws.ping).cyan} ping
    `)

    // let interacts = await client.guilds.cache.get('776933942816538635').commands.fetch()
    // interacts.each(c => {
    //   if (!client.interactions.has(c.name)) return c.delete()
    // })
    // interacts = await client.application.commands.fetch()
    // interacts.each(c => {
    //   if (!client.interactions.has(c.name)) return c.delete()
    // })
  }
}
