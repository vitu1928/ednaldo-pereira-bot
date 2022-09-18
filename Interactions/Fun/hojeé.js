const Interaction = require('../../Structures/Interaction.js')
const { Attachment } = require('discord.js')

module.exports = class HojeeInteraction extends Interaction {
  constructor() {
    super("hojeé", {
      type: 1,
      description: 'Que dia da semana é hoje?',
      defaultPermission: true,
      channelTypes: ["GUILD_TEXT", "DM"]
    })
  }

  async execute({ interaction }) {
    return await interaction.reply({
      files: [
        new Attachment([
          'https://img.ifunny.co/videos/ad953fb171fb8be0bb357b964e0962f54c03a4905b6ce715aaad13e7f7f1b297_1.mp4',
          'https://img.ifunny.co/videos/678ccbbc172e6c8e9443d025057664f9fe30c601caacadbaa4822fe32aaf86ff_1.mp4',
          'https://img.ifunny.co/videos/0ec7d3e97d6eb1f5fb172d864efbafff600cdf4dca7eb3590adcdf7037c51f3f_1.mp4',
          'https://img.ifunny.co/videos/b1b17f9602429662217dd1f6c804806f49f58bd863cd240d5aba55597849e6d2_1.mp4',
          'https://img.ifunny.co/videos/b182aa00bcfd072d27f13291b25c1f5d6e61945b9d3b0a2992be689d3a1c832e_1.mp4',
          'https://img.ifunny.co/videos/7861a0cc4227456105c6e8175fa8f8675ee3f75bfc3788124684529c023087d7_1.mp4',
          'https://img.ifunny.co/videos/dcfbf8b9d7e77ce8c6332ca301992578a21d7d707d4b8dc64274c5b40287edd6_1.mp4'
        ][new Date(new Date() - 1.08e+7).getDay()], 'hojeé.mp4')
      ]
    })
  }
}