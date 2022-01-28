const Interaction = require("../../Structures/Interaction.js")
const { MessageSelectMenu, MessageActionRow, Collection } = require('discord.js')
const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

module.exports = class ConfigInteraction extends Interaction {
  constructor() {
    super("config", {
      type: 1,
      description: "Configuração dos comandos no servidor",
      defaultPermission: true,
      permissions: ["MANAGE_GUILD"],
      options: [
        {
          name: 'comando',
          description: 'Habilitar ou desabilitar algum comando',
          type: "STRING",
          required: false,
          choices: [
            {
              name: "habilitar",
              value: "0"
            },
            {
              name: "desabilitar",
              value: "1"
            }
          ]
        }
      ],
      channelTypes: ["GUILD_TEXT"],
      beta: true
    })
  }

  async execute({ interaction, args, client, configs: db, globalConfigs }) {
    // return interaction.reply({ content: 'beta', ephemeral: true })

    const { guildId } = interaction

    if (!interaction.memberPermissions.has('MANAGE_GUILD')) return await interaction.reply({
      content: ":x: Você não tem permissão para usar esse comando nesta guild!",
      ephemeral: true
    });

    await interaction.deferReply();

    const comando = args?.getString('comando')
    if (comando) {
      async function optionMenuInteraction(enabled) {
        return (await Promise.all(
          client.interactions.filter( 
            int => !int.beta && !globalConfigs.disallowedCommandsDisable.includes(int.name)
          ).map(async ({ name: label, description }) => {
              const { enabled: en } = await db.get(`SELECT enabled FROM \`${guildId}\` WHERE command="${label}"`)

              if (en == enabled) return { 
                label,
                value: label,
                description: description?.length > 100 ? description.slice(97).concat('...') : description ?? " . . . "
              }
              
              return {};
            })
          )).filter(object => object.hasOwnProperty('label'))
      }
      
      const MenuConfig = async (enabled) => {
        let options = await optionMenuInteraction(enabled)

        let disabled = false
        let placeholder = "Escolha os comandos para desabilitar"
        if (!options.at(0)) 
          disabled = true, 
          options = [{label:"any",value:"any"}], 
          placeholder=`Todas as interações já estão ${enabled ? 'desabilitadas' : 'habilitadas'}`;

        return new MessageSelectMenu({
          customId: 'MenuConfig',
          placeholder,
          options,
          minValues: 1,
          maxValues: options.length,
          disabled 
        })
      }

      async function createCollector({ message: m, enabled }) {
        const message = await interaction.followUp(m)


        const collector = message.createMessageComponentCollector({
          idle: 60000,
          filter: () => true,
          componentType: "SELECT_MENU"
        })

        const uuid = client.configsOn.get('_idMaker')(client)

        collector.on('collect', async (interact) => {
          if (interact.user.id !== interaction.user.id) return await interact.reply({
            content: "Para poder selecionar digite o comando: `/config`\nObs: Precisa de permmissão de gerenciar o servidor",
            ephemeral: true
          })


          await interact.deferUpdate()
          client.configsOn.set(uuid, Object.assign({ enabled: enabled ? 0 : 1 }, interact))
          
          async function repl({ message, enabled }) {
            const list = (await db.all(`SELECT command FROM \`${guildId}\` WHERE enabled=${enabled}`))
                .map(({ command }) => command)
                .join(', ');

            return await message.edit({
              content: `${enabled ? "Desabilitado" : "Habilitado"}(s): ${list}`,
              components: [ 
                new MessageActionRow({ components: [ await MenuConfig(!enabled) ] }) 
              ] 
            })
          }

          const filtrados = client.configsOn.filter(({ guildId: gId, enabled: en }) => guildId == gId)

          interact.values.forEach(
            async value => await db.exec(`UPDATE \`${guildId}\` SET enabled=${!enabled} WHERE command="${value}"`)
          )

          filtrados.each(async (value) => await repl(value))
        })

        collector.on('end', async () => {
          client.configsOn.delete(uuid)
        
          await message.edit({
            components: [
              new MessageActionRow({
                components: [
                  message.resolveComponent('MenuConfig')
                    .setDisabled(true)
                    .setPlaceholder(`Use o comando novamente para ${enabled ? "desabilitar" : "habilitar"}!`)
                ]
              })
            ]
          })
        })
      }

      if (comando == '0') {
        // Habilitar
        createCollector({
          message: {
            content: "Escolha as interações que você quer habilitar para esse servidor",
            components: [
              new MessageActionRow({ components: [ await MenuConfig(0) ] })
            ]
          },
          enabled: 0
        })

      } else {
        // Desabilitar
        createCollector({
          message: {
            content: "Escolha as interações que você quer desabilitar para esse servidor",
            components: [
              new MessageActionRow({ components: [ await MenuConfig(1) ] })
            ]
          },
          enabled: 1
        })
      }
    }
  }
}