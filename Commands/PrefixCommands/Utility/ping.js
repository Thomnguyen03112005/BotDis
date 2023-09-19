const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder} = require("discord.js");
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");
const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["pong", "pings"], // lệnh phụ
  description: "Hiển thị độ trễ phản hồi", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
});
data.addCommand(async(client, message, args, prefix) => {
    const pingImageArr = [
      "https://cdn.discordapp.com/attachments/892794857905602560/892794900863660062/63e1657a8a6249a2fc9c062b17f27ce0.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795017104613376/dc87c9ea90b4b7d02a0cbe5de256d385.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795143093108806/a665463e60ef772c82286e4ee6a15353.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795222986207293/4a3a4f44524556704c29879feeba0c23.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795292573913098/534d38d35eb761ad11e43fe378c3de29.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795346172928080/c17166b2af1a743b149e1eb0f3203db4.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795432797872188/6619fe492c713eb3051ab7568181dbdd.gif"
    ];
    const Ping = client.ws.ping;
    var Color;
    if(Ping <= 300) {
      Color = "#00ff00";
    } else if(Ping > 300 && Ping < 600) {
      Color = "#ffff00";
    } else if(Ping >= 600 && Ping < 900) {
      Color = "#ffa500";
    } else if(Ping >= 900) {
      Color = "#ff0000";
    };
    const loadingEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong')
      .setDescription('***Đang tải dữ liệu...*** 💬')
      .setThumbnail(pingImageArr[Math.floor(Math.random() * pingImageArr.length)])
      .setColor('#ffffff');
    const pingEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong')
      .setColor(Color)
      .addFields([
        { name: 'Nhịp websocket', value: `\`\`\`yaml\n${Ping} Ms\`\`\``, inline: true },
        { name: 'Độ trễ khứ hồi', value: `\`\`\`yaml\n${Math.abs(message.createdTimestamp - Date.now())} Ms\`\`\``, inline: true },
        { name: 'Độ trễ API', value: `\`\`\`yaml\n${Math.round(client.ws.ping)} Ms\`\`\``, inline: true },
        { name: 'Sử dụng bộ nhớ', value: `\`\`\`yaml\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true },
      ])
    const msg = await message.channel.send({ embeds: [loadingEmbed] });
    setTimeout(() => {
      msg.edit({ embeds: [pingEmbed] });
    }, 3001);
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = data;