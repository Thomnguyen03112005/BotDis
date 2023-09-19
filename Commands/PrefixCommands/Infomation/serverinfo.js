const { commandBuilders, customEvents } = require(`${process.cwd()}/Events/functions`);
const { EmbedBuilder, ChannelType } = require("discord.js");
const path = require("node:path");

const commands = new commandBuilders({
  name: path.parse(__filename).name, // Tên Lệnh chính
  usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
  category: path.parse(__dirname).name, // thể loại lệnh
  aliases: ["svinfo"], // lệnh phụ
  description: "Xem thông tin về server của bạn", // mô tả dành cho lệnh
  cooldown: 5, // thời gian hồi lệnh
  owner: false, // bật tắt chế độ dev
  permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async(client, message, args, prefix) => {
  const { EmbedBuilders } = customEvents();
  const guild = client.guilds.resolve(message.guildId);
	const icon = guild.iconURL({ size: 4096, dynamic: true });
  const guildFeatures = guild.features;

  const embed = new EmbedBuilders({
    title: { name: `${guild.name}` }, 
    thumbnail: icon,
    colors: "Random",
    fields: [
      { name: "ID", value: `${guild.id}`, inline: true },
	  	{ name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
	  	{ name: "tạo lúc", value: `${new Date(guild.createdTimestamp + 5 * 3600000).toLocaleString()}`, inline: true },
		  { name: "Tổng số thành viên", value: `Tất cả có: ${guild.memberCount} thành viên\n${await guild.members.cache.filter((member) => !member.user.bot).size} người\n${await guild.members.cache.filter((member) => member.user.bot).size} bots\nHiện trực tuyến: ${guild.members.cache.filter((member) => ["online", "idle", "dnd"].includes(member.presence?.status)).size}`, inline: true },
		  { name: "Tất cả Roles", value: `${guild.roles.cache.size}`, inline: true },
		  { name: "Kênh (không bao gồm chủ đề)", value: `Tất cả có ${await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildText || ch.type === ChannelType.GuildVoice).size} kênh và ${await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildCategory).size} danh mục:\n${await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildText).size} kênh văn vản\n${await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildVoice).size} kênh voice\n————————\n${await guild.channels.cache.filter((ch) => ch.type === ChannelType.PublicThread).size} chủ đề công khai`, inline: true },
      { name: "Emojis", value: `Tất cả có: ${guild.emojis.cache.size} emoji\n${await guild.emojis.cache.filter((e) => !e.animated).size} thường\n${await guild.emojis.cache.filter((e) => e.animated).size} động`, inline: true },
		  { name: "Boosts", value: `${guild.premiumTier === 0 ? "không có cấp độ" : `Cấp độ: ${guild.premiumTier}`}\n${guild.premiumSubscriptionCount ? `Tổng số ${guild.premiumSubscriptionCount} lần boosts` : "Không boosts"}`, inline: true },
		  { name: "đặc quyền VIP", value: `${guildFeatures.length === 0 ? "Không có đặc quyền VIP"	: guildFeatures.map((element) => `${element.charAt(0)} ${element.substring(1).toLowerCase().replace(/_/g, " ")}`).join(", ")}`, inline: true }
    ]
  });
	return await message.reply({
	  embeds: [embed],
	}).catch((err) => {});
});

// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;