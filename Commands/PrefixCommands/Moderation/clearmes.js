const { EmbedBuilder } = require("discord.js");
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["clearmessage", "clmessage"], // lệnh phụ
  description: "Xoá tin nhắn theo yêu cầu", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    const amount = Number(args[0]);
    if(amount < 1 || amount > 99) return await message.reply({ 
        embeds: [new EmbedBuilder()
          .setTitle("Lỗi")
          .setDescription("Bạn chỉ có thể xóa từ 1 đến 99 tin nhắn.")
          .setColor("Red")
        ]
    });
    await message.channel.bulkDelete(amount, true).then(async() => {
        return message.channel.send({
          embeds: [new EmbedBuilder()
            .setTitle("Xoá thành công")
            .setDescription(`Đã xóa thành công ${amount} tin nhắn.`)
            .setColor("Random")
          ]
        });
    });
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;