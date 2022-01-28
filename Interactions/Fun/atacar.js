const Interaction = require('../../Structures/Interaction.js')
const { MessageEmbed } = require('discord.js')

module.exports = class AttackInteraction extends Interaction {
  constructor() {
    super("atacar", {
      type: 1,
      description: 'Atacar um membro com o grandioso poder do mestre',
      defaultPermission: true,
      options: [
        {
          name: 'membro',
          description: 'Membro a levar um ataque quase fatal',
          type: "USER",
          required: true
        }
      ],
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, args, client, globalConfigs }) {
    let list = [
        'https://thumbs.gfycat.com/PartialWhirlwindAmericanbadger-max-1mb.gif',
        'https://media1.tenor.com/images/c3a8dcadc7d60ad775d7bcef9b2db685/tenor.gif?itemid=15864115',
        'https://media.tenor.com/images/374f12c22f2e6d9a7b81c462f70dadb2/tenor.gif'
    ];

    return await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('Morra?!!')
          .setDescription(`${interaction.member.displayName} atacou com tudo ${args.getMember('membro').displayName}`)
          .setImage(list[~~(Math.random() * list.length)])
          .setFooter('Ednaldo Pereira mestre', 'https://img.ifunny.co/images/a77f5f8e9233a0c54bf8b80d0453762a0983c58c3aa3d20fecc1746e5fc3e307_3.jpg')  
          .setColor(interaction.member.displayColor)
      ]
    });
  }
}