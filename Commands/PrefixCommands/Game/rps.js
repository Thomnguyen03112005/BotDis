const { commandBuilders, RPSGame } = require(`${process.cwd()}/Events/functions`);

const path = require("node:path");
const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "Chơi game kéo búa bao với bạn bè", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand((client, message, args, prefix) => {
  if(!message.mentions.users.first()) return message.reply({ content: "chỉ định ai đó để chơi cùng" });
  const noidungthachdau = `${args[0] ? args.join(" ") : "Không có nội dung thách đấu"}`;
  const rps = new RPSGame({
    message: message,
    slashCommand: false,
    opponent: message.mentions.users.first(),
    embed: {
      title: 'Oẳn tù tì',
      description: 'Nhấn một nút bên dưới để thực hiện một sự lựa chọn!,\n' + noidungthachdau,
      color: "Red",
    },
    buttons: {
      rock: 'Rock',
      paper: 'Paper',
      scissors: 'Scissors',
    },
    emojis: {
      rock: '🌑',
      paper: '📃',
      scissors: '✂️',
    },
    othersMessage: 'Bạn không được phép sử dụng các nút cho tin nhắn này!',
    chooseMessage: 'bạn chọn {emoji}!',
    noChangeMessage: 'Bạn không thể thay đổi lựa chọn của mình!',
    askMessage: 'Này {opponent}, {challenger} đã thách đấu bạn trong trò chơi Oẳn tù tì!\n' + noidungthachdau,
    cancelMessage: 'Có vẻ như họ từ chối chơi trò Oẳn tù tì. \:(',
    timeEndMessage: 'Vì đối thủ không trả lời, tôi đã bỏ trò chơi!',
    drawMessage: 'Đó là một trận hòa!',
    winMessage: '{winner} thắng trận đấu!',
    gameEndMessage: 'Trò chơi chưa hoàn thành :(',
  });
  rps.startGame();
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = data;