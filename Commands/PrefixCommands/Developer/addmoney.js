const functions = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const data = new functions.commandBuilders({
  name: path.parse(__filename).name, // Tên lệng
  usage: path.parse(__filename).name, // cách sử dụng
  aliases: [""], // lệnh phụ
  description: "Thêm tiền cho thành viên", // mô tả lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: true, // bật, tắt lệnh dành riêng cho dev
  category:"Developer", // tên folder chứa lệnh
  permissions: [], // quyền hạn khi dùng lệnh
  command: async(client, message, args, prefix) => {
    const user = message.mentions.users.first();
    if(!user) return message.reply("Vui lòng thêm người cần add tiền");
    const money = parseInt(args[1]);
    if(!money) return message.reply("Bạn vui lòng nhập thêm số tiền")
    let result = await client.cs.addMoney({ 
      user: user, // mention
      guild: { id : null },
      amount: money,
      wheretoPutMoney: "wallet"
    });
    if(result.error) {
      return message.reply({ content: "Bạn không thể thêm tiền âm" });
    } else message.reply({ content: `Đã thêm thành công ${await client.cs.formatter(money)} vào ${user.username}.` });
  },
});

module.exports = data;