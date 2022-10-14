const Interaction = require('../../Structures/Interaction.js'),
{ inspect } = require('util'),
{ EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = class EvalInteraction extends Interaction {
  constructor() {
    super("eval", {
      type: 1,
      description: 'Executar códigos, apenas devs podem usar isso',
      defaultPermission: false,
      options: [
        {
          name: 'código',
          description: 'Código a ser executado',
          type: "STRING",
          required: true
        },
        {
          name: 'discord',
          description: 'Declarar as variaveis do discord (EmbedBuilder, AttachmentBuilder ...)',
          type: "BOOLEAN",
          required: false
        },
        {
          name: 'mobile',
          description: 'Caso seja muito grande a resposta e você esteja no celular isso pode ajudar',
          type: "BOOLEAN",
          required: false
        }
      ],
      beta: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction, args, client, fanarts, configs, fotos }) {
    const embedEval = new EmbedBuilder({
      title: "Eval",
      color: 3092790
    })
    
    let files = [], retorno;
    
    try {
      if (args.getBoolean('discord')) var execute = '\nrequire("discord.js")'
      retorno = inspect(eval(`${typeof(execute) !== 'undefined' ? execute : ""}\n${args.getString('código')}`))

    } catch ({ message, name }) {
      retorno = message
      embedEval 
        .setTitle(name)
        .setColor("#FF0000")

    } finally {
      if (args.getBoolean('mobile')) embedEval.addField("Retorno", `\`\`\`js\n${retorno.slice(0, 999)}\`\`\``)
      if (retorno.length < 999) embedEval.addField("Retorno", `\`\`\`js\n${retorno}\`\`\``);
      else files = [new AttachmentBuilder(Buffer.from(retorno), `${interaction.user.username}.js`)]

      await interaction.reply({
        files,
        embeds: files.at(0) ?  [] : [embedEval]
      })
    }
  }
}