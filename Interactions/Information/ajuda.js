const Interaction = require('../../Structures/Interaction.js')
const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js')

module.exports = class HelpInteraction extends Interaction {
  constructor() {
    super("ajuda", { // Info
      type: 1,
      description: 'Ver informações de comandos e do servidor',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT"] // "DM"
    })
  }

  async execute({ interaction, client }) {
      const menu = new SelectMenuBuilder({
        customId: 'menuAjuda',
        minValues: 1,
        maxValues: 1,
        placeholder: 'Escolha alguma das opções que precisa de ajuda',
        options: [
          {
            label: 'Interações',
            value: 'interacoes',
            description: 'Interações disponíveis no bot',
            emoji: '🤖'
          },
          {
            label: 'Serverinfo',
            value: 'serverinfo',
            description: 'Info sobre o server',
            emoji: 'ℹ️'
          }
        ]
      })

      const row = new ActionRowBuilder({
        components: [ menu ]
      })

      await interaction.reply({
        embeds: [
          new EmbedBuilder({
            title: "Ednaldo Pereira Bot",
            image: {
              url: 'https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/c/4/e/9/c4e987143a79ddc7769d979b49d86456.jpg'
            },
            color: 3751250
          })
        ],
        components: [
          row
        ]
      })

      const message = await interaction.fetchReply()
      const checkEmptyString = (s) => { if (s != '') return s }
      const guild = await client.guilds.fetch(interaction.guild)
      const member = interaction.member
      const [emojiAnimated, emoji] = guild.emojis.cache.partition(e => e.animataed)

      let emptyLine = { inline: true, name: '\u200B', value: '\u200B' }
      let inline = true
      
      const embeds = {
        serverinfo: new EmbedBuilder({
          title: "Serverinfo",
          description: guild.description,
          thumbnail: {
            url: guild.iconURL({
              dynamic: true,
              size: 128
            })
          },
          image: {
            url: guild.bannerURL({
              size: 2048
            }) ?? guild.discoverySplashURL({
              size: 2048
            })
          },
          /*
            x | • | x
            x | • | x
            x | • | x
            x | • | x
            x | • | x
          */
          fields: [
            {
              name: "Qntd. Membros",
              value: `\`\`\`py\n${guild.memberCount - guild.members.cache.filter(m => m.roles.botRole).size}\`\`\``,
              inline
            },
            emptyLine,
            {
              name: "Qntd. Emojis",
              value: `Animado: ${emojiAnimated.size}\nNão animados: ${emoji.size}`,
              inline
            },
            {
              name: "Qntd. Canais",
              value: `\`\`\`py\n${guild.channels.cache.size}\`\`\``,
              inline
            },
            emptyLine,
            {
              name: "Qntd. Banimentos",
              value: `\`\`\`py\n${guild.bans.cache.size ?? 0}\`\`\``,
              inline
            },
            {
              name: 'Qntd. Cargos',
              value: `\`\`\`py\n${guild.roles.cache.size}\`\`\``,
              inline
            },
            emptyLine,
            {
              name: 'Qntd. Stickers',
              value: `\`\`\`py\n${guild.stickers.cache.size}\`\`\``,
              inline
            },
            {
              name: 'Cargo mais alto',
              value: `<@&${guild.roles.highest.id}>`,
              inline
            },
            emptyLine,
            {
              name: "Adm",
              value: `<@!${guild.ownerId}>`,
              inline
            },
            {
              name: 'Entrou ',
              value: `<t:${parseInt(member.joinedTimestamp/1000)}:R>`,
              inline
            },
            {
              name: 'Invites',
              value: `${
                checkEmptyString(
                  Array.from(
                    (await guild.invites.fetch()).map(
                      (inv, index) => `[${index}](${inv.url} "Criado por ${inv.inviter?.username ?? "?"}")`
                    )
                  ).join('\n')
                ) ?? "*Não há invites*"}`
            },
            {
              name: "Criado",
              value: `<t:${parseInt(guild.createdTimestamp/1000)}:R>`,
              inline
            }
          ],
          color: member.displayColor ?? 3751250
        }),

        interacoes: new EmbedBuilder({
          title: "Interações",
          description: `Escolha a interação que você precisa de ajuda!`,
          color: 3751250
        })
      }

      const components = {
        interacoes: (function() {
          let menus = [];
          const commands = client.application.commands.cache
          let size = commands.size

          let i = 0
          do {
            menus.push(
              new SelectMenuBuilder({
                customId: 'menuInteractions',
                minValues: 1,
                maxValues: 1,
                placeholder: 'Escolha o comando que você precisa de ajuda',
                options: commands.filter((a,index) => index > i*25).map(v => {
                  return {
                    label: v.name,
                    value: v.name,
                    description: v.description.slice(100),
                    emoji: '🤖'
                  }
                })
              })
            )
            i++
            size-=25
          } while(size > 25)
          
          return menus
        })(),
        serverinfo: []
      }
      
      const collector = message.createMessageComponentCollector({
        idle: 60000*5,
        filter: async (i) => i.customId === 'menuAjuda' 
      })

      collector.on('collect', async (i) => {
        const value = i.values[0]
        const component = components[value].at(0) ? [new ActionRowBuilder({ components: [...components[value]] })] : [];
        
        const mes = await i.reply({
          ephemeral: true,
          embeds: [
            embeds[value],
          ],
          components: component,
          fetchReply: true
        })


        const ephemeralCollector = mes.channel.createMessageComponentCollector({
          componentType: 3,
          filter: (i) => i.customId === 'menuInteractions' 
        })

        ephemeralCollector.on('collect', async (i) => {
          let interactCommand = client.interactions.get(i.values[0])

          let desc = {
            "1": 'Slash commands, use \`/\` no chat para ver os slash disponíveis',
            "2": 'User, clique com o dedo direito do mouse em algum membro (se estiver no celular, clique em algum membro)',
            "3": 'Message, clique nos três pontinhos em alguma mensagem para ver as funções disponíveis'
          }

          return await i?.reply({
            embeds: [
              new EmbedBuilder({
                title: interactCommand.name,
                description: interactCommand.description,
                fields: [
                  {
                    name: "Uso",
                    value: desc[interactCommand.type],
                    inline: false
                  },
                  {
                    name: "Opções",
                    value: `\`\`\`md\n${interactCommand.options.map(int => `- ${int.name}: ${int.description}`).join('\n') || "..."}\`\`\``
                  }
                ],
                color: 3751250
              })
            ],
            ephemeral: true,
            fetchReply: true
          }).catch(console.error)
        })
      })

      collector.on('end', async () => {
        row.components[0].setDisabled(true)
        await message.edit({
          content: "Utilize o comando novamente!",
          components: [
            row
          ]
        })
      })
  }
}
