const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "khởi chạy giveaways cho server", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand((client, message, args, prefix) => {
  const channelId = message.mentions.channels.first();
  return client.giveawaysManager.startGiveaway(message, channelId);
});

// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;