const { Client, Collection, Permissions } = require('discord.js')
const { readdirSync } = require('fs')
const globalConfigs = require('../globalConfigs.json')

module.exports = class EdnaldoClient extends Client {
  constructor() {
    super({
      partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER'],
      intents: [
        1, // GUILD
        512 , // GUILD MESSAGES
        2, // GUILD ... 
        16, // GUILD INTEGRATIONS
        32768, // MESSAGE CONTENT
        32, // GUILD WEBHOOKS
        4, // GUILD BANS
      ],
      allowedMentions: { parse: ['roles', 'users'] },
      presence: {
        status: 'online',
        activities: [
          'Chance',
          'Vale nada Vale Tudo',
          'Homem Oferecido',
          'Se',
          'Doce doce amor',
          'Os homens que entraram no vagão',
          'Mesclado',
          'Esperança',
          'Princesinha',
          'Não é fácil',
          'Hora',
          'What is The Brother',
          'Mulher contrariada',
          'Fleig',
          'Jaz',
          'Chance II',
          'Mulher combinada',
          'Indiferença',
          'Deus De Abraão',
          'Cuspi no prato',
          'Cidade capital',
          'Who is The Sister',
          'God Is Good',
          'Importância',
          'Saída',
          'Tímpano',
          'Tempo',
          'Pensamentos',
          'Ninguém',
          'Radialistas',
          'Delegada da cidade'
        ].map(c => { return { name: c, type: 'LISTENING'}})
      }
    })
    
    this.events = new Collection()
    this.interactions = new Collection()

    this.fanartsCache = new Collection()
    this.fotosCache = new Collection()
    this.configsOn = new Collection([
      [
        'id', 
        0
      ]
    ])
    this.configsOn = this.configsOn.concat(
      new Collection([
        [
          '_idMaker', 
          function idMaker(client) {
            var index = client.configsOn.get('id');
            client.configsOn.set('id', ++index);
            return client.configsOn.get('id');
          }
        ]
      ])
    )
  }

  async loadEvents() {
    const eventFiles = readdirSync(process.cwd() + '/Events/').filter(file => file.endsWith('.js'))

    eventFiles.forEach(event => {
      let e = require(`../Events/${event}`)
      e = new e(this)
      const eventName = event.slice(0, -3)
      this.events.set(eventName, e)

      if (e.once) {
        this.once(eventName, function (...args) {
          try { e.execute(...args, this) } catch(e) { console.error(e) }
        })
      } else {
        this.on(eventName, function (...args) {
          try { e.execute(...args, this) } catch(e) { console.error(e) }
        })
      }
    })
  }

  async loadInteractions() {
    try {
      const interactionFolders = readdirSync(process.cwd() + '/Interactions/')
      const guilda = this.guilds.cache.get('776933942816538635')
      
      for (const folder of interactionFolders) {
        const interactionFiles = readdirSync(`./Interactions/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of interactionFiles) {
          
          let interact = require(`../Interactions/${folder}/${file}`)
          interact = new interact()
          this.interactions.set(interact.name, interact)
          
          try {
            if (!globalConfigs.ednaldoServerCommands.includes(interact.name)) {
              // !globalConfigs.disallowedCommandsDisable.includes(interact.name)
              await this.application.commands.create(interact)
              console.log(interact.name)
            } else {
              await guilda.commands.create(interact)
              /*
 q            inter.permissions.set({
                permissions: [
                  {
                    id: '731522255133081650',
                    type: 'USER',
                    permission: true
                  },
                  {
                    id: '589068449544929281',
                    type: 'USER',
                    permission: true
                  },
                  {
                    id: '416738506291806220',
                    type: 'USER', 
                    permission: true
                  },
                  {
                    id: '810845854796873739',
                    type: 'ROLE',
                    permission: false
                  }
                ]
              })
*/
              console.log('Ednaldo Pereira Server:', interact.name)
            }
          } catch(e) {
            console.error("Ocorreu algum erro ao criar o comando", interact.name)
            console.error(e)
          }
        }
      }

  
      console.log("Interações carregadas")
    } catch(e) {
      console.error(e)
    }
  }
}