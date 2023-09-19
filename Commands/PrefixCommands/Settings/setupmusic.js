const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const path = require("node:path");
const { musicEmbedDefault, commandBuilders } = require(`${process.cwd()}/Events/functions`);
const { Music: database } = require(`${process.cwd()}/Assets/Schemas/database`);

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["sums", "setupdefaultmusic"], // lệnh phụ
  description: "Thiết lập hệ thống âm nhạc cho channel", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: ["Administrator"] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    var Emojis = [`0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`, `🟥`,`🟧`, `🟨`, `🟩`, `🟦`, `🟪`, `🟫`];
    let channel = message.mentions.channels.first();
    if(!channel) return message.reply({ content: `**Bạn quên ping một Text-Channel!**` });
    const guildData = await database.findOne({ GuildId: message.guild.id, GuildName: message.guild.name });
    if(!guildData) return;
    return channel.send(musicEmbedDefault(client, message.guild)).then(async(msg) => {
        // Cập nhật thuộc tính setDefaultVolume với giá trị mới
        guildData.ChannelId = channel.id;
        guildData.MessageId = msg.id;
      
        await guildData.save().then(() => {
          return message.reply({
            content: ` **Thiết lập thành công Hệ thống Âm nhạc trong:** <#${channel.id}>`
          });
        });
    });
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;