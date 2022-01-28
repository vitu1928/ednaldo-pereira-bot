const Interaction = require('../../Structures/Interaction.js')
const { MessageEmbed } = require('discord.js')

module.exports = class AvatarInteraction extends Interaction {
  constructor() {
    super("avatar", {
      type: 1,
      description: 'Pegar o avatar de algum membro',
      defaultPermission: true,
      options: [
        {
          name: 'membro',
          description: 'Membro para pegar o avatar',
          type: "USER",
          required: false,
        },
        {
          name: 'tamanho',
          description: 'Tamanho da imagem, padrão 512',
          type: "STRING",
          required: false,
          choices: [
            {
              name: "16",
              value: "16"
            },
            {
              name: "32",
              value: "32"
            },
            {
              name: "64",
              value: "64"
            },
            {
              name: "128",
              value: "128"
            },
            {
              name: "256",
              value: "256"
            },
            {
              name: "512",
              value: "512"
            },
            {
              name: "1024",
              value: "1024"
            },
            {
              name: "2048",
              value: "2048"
            },
            {
              name: "4096",
              value: "4096"
            },
          ]
        },
      ],
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, args, client }) {
    interaction.deferReply()
    const user = args.getUser('membro') ?? interaction.user
    
    const avatar = (format) => user.displayAvatarURL({
      format: format,
      dynamic: true,
      size: parseInt(args.getString('tamanho')) ?? 512
    })

    await interaction.followUp({
      embeds: [
        new MessageEmbed()
        .setTitle(user.username)
        .setDescription(`
        > [webp](${avatar('webp')})
        > [png](${avatar('png')})
        > [jpg](${avatar('jpg')})
        > [jpeg](${avatar('jpeg')})
        `)
        .setImage(avatar('png'))
        .setColor('#2F3136')
      ]
    })
  }
}