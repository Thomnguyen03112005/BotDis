const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand((client, message, args, prefix) => {
  
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;

/*
if(args[0].toLowerCase() === "test") {

} else {
  return message.reply({
    content: "Test zzzz"
  });
};
*/

