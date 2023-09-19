const { welcomeGoodbye: database } = require(`${process.cwd()}/Assets/Schemas/database`);
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Thiết lập kênh welcome cho guilds", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    const data = await database.findOne({
      GuildId: message.guild.id
    });
    if(!data) return;
    const newChannel = message.mentions.channels.first();
    if(!newChannel) return message.reply({
      content: "Vui lòng đề cập đến channel bạn muốn thiết lập"
    });
    data.WelcomeChannel = newChannel.id;
    await data.save().then(() => {
      return message.reply({
        content: `Đã thiết lập welcomeChannel ở <#${newChannel.id}>`
      });
    }).catch((e) => console.log(e));
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;