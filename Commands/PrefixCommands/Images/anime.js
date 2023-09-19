const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const { fetchRandom } = require('nekos-best.js');
const path = require("node:path");
const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: [], // lệnh phụ
  description: "gởi ảnh/gif anime theo yêu cầu", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
});

data.addCommand(async(client, message, args, prefix) => {
    const optionsName = args[0];
    if(!optionsName) return message.reply({
      content: "vui lòng nhập một trong số các tên dưới đây: \`baka, bite, blush, bored, cry, cuddle, dance, facepalm, feed, handhold, happy, highfive, hug, kick, kiss, laugh, nod, nom, nope, pat, poke, pout, punch, shoot, shrug, slap, sleep, smile, smug, stare, think, thumbsup, tickle, wave, wink, yeet, husbando, kitsune, neko, waifu\`"
    });
    try {
      const response = await fetchRandom(optionsName);
      return message.reply({ content: response.results[0].url });
    } catch(error) {
      return message.reply("Bạn đã nhập sai tên anime rồi, vui lòng thử lại");
    };
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = data;