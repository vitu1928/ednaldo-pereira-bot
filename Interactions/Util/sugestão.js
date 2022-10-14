const Interaction = require('../../Structures/Interaction.js')
const { 
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionCollector,
  EmbedBuilder 
} = require('discord.js');


module.exports = class SugerirInteraction extends Interaction {
  constructor() {
    super("sugerir", {
      type: 1,
      description: 'Sugira alguma funcionalidade para o Bot ou para o servidor do Ednaldo Pereira!',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, client }) {
    const modal = new ModalBuilder()
			.setCustomId('sugest')
			.setTitle('Sugestão');

		const sugestionNameInput = new TextInputBuilder()
			.setCustomId('sugestionNameInput')
			.setLabel("Qual o título da sua sugestão?")
			.setStyle(TextInputStyle.Short)
      .setMaxLength(256)
      .setRequired(true);

		const sugestDescriptionInput = new TextInputBuilder()
			.setCustomId('sugestDescriptionInput')
			.setLabel("Sua sugestão")
			.setStyle(TextInputStyle.Paragraph)
      .setMaxLength(1000)
      .setRequired(true);

		// Add inputs to the modal
		modal.addComponents(
      new ActionRowBuilder().addComponents(sugestionNameInput),
      new ActionRowBuilder().addComponents(sugestDescriptionInput)
    )

		await interaction.showModal(modal);
    const collector = new InteractionCollector(client ,{ 
      interactionType: 5,
      max: 1,
      filter: 
        async (inte) => inte.user.id == interaction.user.id && 
        inte.customId === "sugest" &&
        await inte.deferReply({ 
          content: 'Seu envio foi recebido com sucesso!',
          ephemeral: true
        })
    })

    collector.on('collect', async (i) => {
      await i?.followUp({ 
        content: 'Seu envio foi recebido com sucesso! Disponível para ver em: <#776983032598102058>'
      });
      
      const title = i.fields.getTextInputValue('sugestionNameInput'),
        description = i.fields.getTextInputValue('sugestDescriptionInput');
    
      const embed = new EmbedBuilder({
        title,
        description,
        color: 3092790,
        author: {
          name: interaction.user.username,
          url: `https://discordapp.com/users/${interaction.user.id}`,
          iconURL: interaction.user.avatarURL({
            format: "png",
            size: 32
          })
        },
        timestamp: Date.parse(new Date()), 
      })

      const message = await client.channels.cache.get("727951498184622101")
        .send({ embeds: [embed] });
      message.react("✔️");
      message.react("✖️");
    })
  }
}
