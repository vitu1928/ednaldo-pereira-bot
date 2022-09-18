const Interaction = require('../../Structures/Interaction.js')

module.exports = class WebHookInteraction extends Interaction {
  constructor() {
    super("webhook", {
      type: 1,
      description: 'Fazer um "usuário falar" algo, como se fosse um comando "say"',
      defaultPermission: true,
      options: [
        {
          name: 'mensagem',
          description: 'Mensagem que vai ser falada',
          type: 3,
          required: true
        },
        {
          name: 'usuário',
          description: 'Usuário que vai "falar"',
          type: 6,
          required: true
        },
        {
          name: 'arquivos',
          description: 'Links dos arquivos para serem enviados junto com a mensagem, separe-os por um espaço',
          type: 3,
          required: false
        },
        {
          name: 'canal',
          description: 'Canal que vai ser enviado a mensagem',
          type: 7,
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT"],
      beta: true
    })
  }

  async execute({ interaction, args, client }) {
    let canal = args.getChannel('canal') ?? interaction.channel
    const files = args.getString('arquivos')?.split(" ")?.filter(fileLink => /(https?)?:\/\/((www)\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256})\.([a-zA-Z0-9()]{1,6})\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/.test(fileLink))

    let sus = args.getUser('usuário')
    let user = sus.displayAvatarURL()
    let nick = interaction.guild.members.cache.get(sus.id).displayName

    let webhook = await canal.fetchWebhooks()
    webhook = webhook.find(x => x.name === client.user.username)

    if (!webhook) return webhook = await canal.createWebhook(client.user.username, {
      avatar: user
    })
    
    await webhook.edit({
      avatar: user,
      name: nick
    })

    await interaction?.reply({
      content: 'Enviado',
      ephemeral: true
    })

    await webhook.send({ 
      content: args.getString('mensagem'),
      files
    })

    return await webhook.edit({
      avatar: client.user.displayAvatarURL(),
      name: client.user.username 
    })
  }
}