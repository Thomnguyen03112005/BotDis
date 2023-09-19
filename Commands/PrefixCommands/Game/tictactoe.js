const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const TicTacToe = require("discord-tictactoe");
const path = require("node:path");

const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["ttt", "ox", "xo"], // lệnh phụ
  description: "Chơi game cờ ox cùng bạn bè", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
});
data.addCommand(async (client, message, args, prefix) => {
  new TicTacToe({ language: 'vi' }).handleMessage(message);
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = data;