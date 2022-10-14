const Event = require('../Structures/Event.js')

module.exports = class extends Event {
  constructor(client) {
    super("error", client, true)
  }

  async execute(err) {
    console.error('Ocorreu algum erro:', err)
  }
}