const Interaction = require('../../Structures/Interaction.js')

module.exports = class GetCargoInteraction extends Interaction {
  constructor() {
    super("cargo", {
      type: 1,
      description: 'Escolher um cargo',
      defaultPermission: false,
      options: [
        {
          name: 'você_é',
          description: 'O que você é do mestre?',
          type: "STRING",
          required: true,
          choices: [
            {
              name: "fã_do_mestre",
              value: "776942461574447173"
            }, 
            {
              name: "hater_do_mestre",
              value: "830522311098499094"
            }
          ]
        }
      ],
      channelTypes: ["GUILD_TEXT"]
    })
  }

  async execute({ interaction, args, client }) {
    args = args.getString('você_é')
    let memberRoles = interaction.member.roles
    if (memberRoles.cache.has(args)) return await interaction.reply({
      content: "Você já tem esse cargo!",
      ephemeral: true
    })

    memberRoles = (await memberRoles.add(args)).roles
    if (memberRoles.cache.hasAll('776942461574447173', '830522311098499094'))
    await memberRoles.remove(args == '776942461574447173' ? '830522311098499094' : '776942461574447173');

    return await interaction.reply({
      content: `Cargo <@&${args}> adicionado com sucesso!`,
      ephemeral: true
    })
  }
}