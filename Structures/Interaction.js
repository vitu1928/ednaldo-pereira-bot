module.exports = class Interaction {
  constructor(name, opts = {}) {
    this.name = name
    this.description = opts.description || null
    this.options = opts.options || []
    this.type = opts.type 
    this.defaultPermission = opts.defaultPermission || false
    this.beta = opts.beta 
  }
}