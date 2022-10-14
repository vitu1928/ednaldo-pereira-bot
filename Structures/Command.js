module.exports = class Command {
  constructor(options = {}, client) {
		client = client || options.client
		this.name = options.name
		this.description = options.description || 'Sem descrição'
		this.category = options.category || 'Util'
		this.permissions = Array.from(new Permissions(options.permissions).freeze()) || []
	}
}