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
          type: "STRING",
          required: true
        },
        {
          name: 'usuário',
          description: 'Usuário que vai "falar"',
          type: "USER",
          required: true
        },
        {
          name: 'canal',
          description: 'Canal que vai ser enviado a mensagem',
          type: "CHANNEL",
          required: false
        },
        {
          name: 'arquivos',
          description: 'Links dos arquivos para serem enviados junto com a mensagem, separe-os por um espaço',
          type: "STRING",
          required: false
        }
      ],
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, args, client }) {
    let canal = args.getChannel('canal') ?? interaction.channel
    let files = args.getString('arquivos')?.split(" ")

    files = files?.filter(fileLink => /(https?)?:\/\/((www)\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256})\.([a-zA-Z0-9()]{1,6})\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/.test(fileLink))

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