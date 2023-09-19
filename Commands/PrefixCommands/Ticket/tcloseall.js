const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "xoá tất cả các kênh ticket", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
  let sent = await message.reply("Đóng tickets ...");
  const response = await client.ticketCloseAll(message, message.author);
  return sent.editable ? sent.edit(response) : message.channel.send(response);
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;