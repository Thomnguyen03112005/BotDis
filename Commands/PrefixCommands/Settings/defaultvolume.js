const { Music: database } = require(`${process.cwd()}/Assets/Schemas/database`);
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Thiết lập volume mặc định cho guild", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    const guildData = await database.findOne({ GuildId: message.guild.id });
    if(!args[0]) return message.reply({
      content: "Vui lòng nhập mức âm lượng mong muốn"
    });
    let volume = Number(args[0]);
    if(!volume || (volume > 150 || volume < 1)) return message.reply({
      content: "Bạn chỉ có thể nhập tối thiểu là 1 và nhiều nhất là 150"
    });
    // Cập nhật thuộc tính setDefaultVolume với giá trị mới
    guildData.setDefaultMusicData.DefaultVolume = volume;
    // thiết lập thuộc tính với giá trị mới
    await guildData.save();
    return message.reply({
      content: `Đã đặt ${volume} làm volume mặc định`,
    });
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;