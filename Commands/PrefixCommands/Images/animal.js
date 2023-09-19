const { baseURL, commandBuilders } = require(`${process.cwd()}/Events/functions`);
const { EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const path = require("node:path");

const data = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["aml"], // lệnh phụ
  description: "Xem hình ảnh của các con vật theo yêu cầu", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
});

data.addCommand(async(client, message, args, prefix) => {
    if(!args[0]) return message.reply({
      content: "Vui lòng nhập tên con vật bất kỳ theo ý muốn"
    });
    const choices = args[0].toLowerCase();
    if(choices === "dog") {
      return randomAnimal(message, "https://dog.ceo/api/breeds/image/random");
    } else if(choices === "fox") {
      return randomAnimal(message, "https://randomfox.ca/floof/");
    } else if(choices === "cat") {
      return randomAnimal(message, "https://api.thecatapi.com/v1/images/search");
    };
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
async function randomAnimal(message, url) {
  return await baseURL(url).then(async(response) => {
    if(!response.success) return message.reply({ content: "Có lỗi sảy ra vui lòng thử lại sau" });
    const button1 = new ButtonBuilder({ customId: "editButtons", emoji: "🛑", style: ButtonStyle.Secondary, });
    const row1 = new ActionRowBuilder({ components: [button1] });
    let responsez;
    if(response.data[0]) {
      responsez = response.data[0].url;
    } else if(response.data.message) {
      responsez = response.data.message;
    } else if(response.data.image) {
      responsez = response.data.image;
    };
    const msg = await message.channel.send({ content: `${responsez}`, components: [row1] });
    const collector = message.channel.createMessageComponentCollector({
      filter: (reaction) => reaction.user.id === message.member.id && reaction.message.id === msg.id,
      idle: 30 * 1000,
      dispose: true,
      componentType: ComponentType.Button,
    });
    collector.on("collect", async(response) => {
      await response.deferUpdate();
      if(response.customId === "editButtons") {
        const responses = await baseURL(url);
        let response_;
        if(responses.data[0]) {
          response_ = responses.data[0].url;
        } else if(responses.data.message) {
          response_ = responses.data.message;
        } else if(responses.data.image) {
          response_ = responses.data.image;
        };
        await msg.edit({ content: `${response_}`, components: [row1] }); 
      };
      collector.on("end", async() => {
        await msg.edit({ components: [] });
      });
    });
  });
};

module.exports = data;