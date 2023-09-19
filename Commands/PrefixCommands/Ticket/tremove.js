const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Xoá thành viên hoặc role ra khỏi ticket", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    if(!args[0]) return message.reply("Vui lòng cung cấp thành viên hoặc role để xóa");
    let inputId;
    if(message.mentions.users.size > 0) {
      inputId = message.mentions.users.first().id;
    } else if(message.mentions.roles.size > 0) {
      inputId = message.mentions.roles.first().id;
    } else inputId = args[1];
    const response = await client.removeFromTicket(message, inputId);
    message.reply(response);
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;