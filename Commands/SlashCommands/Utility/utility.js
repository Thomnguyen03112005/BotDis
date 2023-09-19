const { ApplicationCommandOptionType, ButtonStyle, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ComponentType } = require("discord.js");
const { slashCommandBuilder } = require(`${process.cwd()}/Events/functions`);
const fetch = require('node-fetch');

const slashCommand = new slashCommandBuilder({
  name: "utility", // Tên lệnh 
  description: "một số lệnh utility", // Mô tả lệnh
  userPerms: [], // quyền của thành viên có thể sử dụng lệnh
  owner: false, // true để chuyển thành lệnh của chủ bot, false để tắt
  cooldown: 3, // thời gian hồi lệnh
  options: [
    { 
      name: "corona", 
      description: "xem tình hình covid 19", 
      type: ApplicationCommandOptionType.Subcommand, 
    },
  ]
});
//
slashCommand.addSlashCommand((client, interaction) => {
  if(interaction.options.getSubcommand() === "corona") {
    return interaction.reply({ content: "test" });
  };
});
// console.log(slashCommand.toJSON());

module.exports = slashCommand;