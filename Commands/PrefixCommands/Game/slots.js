const { commandBuilders, Slots } = require(`${process.cwd()}/Events/functions`);
const { EmbedBuilder } = require("discord.js");
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Slots Game", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
    let user = await client.cs.balance({ 
      guild: { id: null },
      user: message.author
    });
    const checkMoney = new EmbedBuilder()
      .setColor("Random")
      .setTimestamp()
      .setDescription(`Sử dụng lệnh không hợp lệ\nVui lòng sử dụng ${prefix + path.parse(__filename).name} <Số tiền>`)
    let moneyEarned = parseInt(args[0]);
    if(moneyEarned > user.wallet) return message.reply({ embeds: [checkMoney.setDescription("Bạn không có nhiều tiền trong ví của mình")]});
    if(!moneyEarned) return message.reply({ embeds: [checkMoney] });
    if(moneyEarned < 1) return message.reply({ embeds: [checkMoney.setDescription("Vui lòng chỉ định một số cao hơn \`1\`")]});
    if(moneyEarned > 100000) return message.reply({ embeds: [checkMoney.setDescription("Vui lòng chỉ định một số nhỏ hơn \`100.000.000.000\`")]});
    if(isNaN(args[0])) return message.reply({ embeds: [checkMoney.setDescription("Vui lòng chỉ định một số hợp lệ!")]});

    const Game = new Slots(client, {
      message: message,
      slashCommands: false,
      moneyNumber: moneyEarned,
      embed: {
         title: 'Slot Machine',
         color: '#5865F2'
      },
      slots: ['🍇', '🍊', '🍋', '🍌']
    });
    Game.startGame();
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;