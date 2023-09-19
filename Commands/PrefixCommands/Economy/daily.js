const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Một cách để kiếm tiền daily", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
  let result = await client.cs.daily({
    user: message.author,
    guild: { id: null },
    amount: 100,
  });
  if(result.error) {
    return message.reply({ content: `Bạn đã sử dụng daily gần đây Hãy thử lại trong ${result.time}` });
  } else {
    message.reply({ content: `Bạn đã kiếm được ${await client.cs.formatter(result.amount)}. (${result.rawData.streak.daily})` });
  };
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;