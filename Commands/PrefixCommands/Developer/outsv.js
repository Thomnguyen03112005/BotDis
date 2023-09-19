const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const database = require(`${process.cwd()}/config.json`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "kéo bot ra khỏi sever chỉ định", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: true, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
  const guildId = args[0] || message.guild;
  const rgx = /^(?:<@!?)?(\d+)>?$/;
  if (!rgx.test(guildId)) return message.reply({ content: "bạn vẫn chưa nhập id server" });
  const guild = message.client.guilds.cache.get(guildId);
  if (!guild) return message.reply({ content: "ID server không đúng vui lòng kiểm tra lại" });
  await guild.leave();
  await message.reply({ embeds: [new ButtonBuilder()
      .setTitle("out sever")
      .setColor(database.colors.vang)
      .setDescription(`Đã rời khỏi server **\`${guild.name}\`** với **\`${guild.memberCount}\`** thành viên👋`)
  ]});
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;