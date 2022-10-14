module.exports = class Event {
  constructor(name, client, once) {
    this.name = name
    this.client = client
    this.once = once || false
  }
}