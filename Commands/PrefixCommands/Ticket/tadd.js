const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "thêm thành viên hoặc role vào kênh ticket", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
  if(!args[0]) return message.reply("Vui lòng cung cấp id thành viên hoặc id role để thêm vào yêu cầu");
  const response = await client.addToTicket(message, args[0]);
  return message.reply(response);
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;