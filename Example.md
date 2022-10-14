## `Interaction`
[options](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOption "Opções possíveis na hora da criação do comando")

[type](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandType)
```javascript
const Interaction = require('../../Structures/Interaction.js')

module.exports = class NameInteraction extends Interaction {
  constructor() {
    super("name", {
      type: 1,
      description: 'Description',
      defaultPermission: true,
      options: [
        {
          name: '',
          description: '',
          type: "STRING",
          required: false,
          choices: [
            {
              name: "",
              value: ""
            }
          ]
        }
      ],
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client }) {
    // code
  }
}
```
## `Event`
```javascript
const Event = require('../Structures/Event.js')

module.exports = class extends Event {
  constructor(client) {
    super("eventName", client, true)
  }

  async execute(arg0, arg1, client) {
    // code
  }
}
```
