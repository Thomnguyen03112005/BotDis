const { EmbedBuilder } = require("discord.js");
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");
// cấu trúc yêu cầu
const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["emif"], // lệnh phụ
  description: "Xem thông tin về emoji nào đó", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
});
// thực hiện lệnh 
data.addCommand((client, message, args, prefix) => {
  let Emojis = "", EmojisAnimated = "", EmojiCount = 0, Animated = 0, OverallEmojis = 0;
  message.guild.emojis.cache.forEach((emoji) => {
    OverallEmojis++;
    if(emoji.animated) {
      Animated++;
      EmojisAnimated += client.emojis.cache.get(emoji.id).toString();
    } else {
      EmojiCount++;
      Emojis += client.emojis.cache.get(emoji.id).toString();
    }
  });
  return message.reply({ embeds:[new EmbedBuilder() 
        .setTitle("Tổng số emoji của " + message.guild.name)
        .setDescription(`Có ${OverallEmojis} emojis`)
        .addFields([
          { name: `emoji động [${Animated}]`, value: EmojisAnimated.substr(0, 1021) ? EmojisAnimated.substr(0, 1021) + "..." : "Không có", inline: false },
          { name: `emojj tĩnh [${EmojiCount}]`, value: Emojis.substr(0, 1021) ? Emojis.substr(0, 1021) + "..." : "Không có", inline: false },
        ])
  ]});
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = data;