// const sqlite3 = require('sqlite3')
// const { open } = require('sqlite')

module.exports = class extends Event {
  constructor(client) {
    super("guildDelete", client)
  }
  
  async execute(guild, client) {
    // DELETE GUILD FROM DB
  }
}
