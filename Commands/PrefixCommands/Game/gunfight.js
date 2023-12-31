const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const { commandBuilders } = require(`${process.cwd()}/Events/functions`);
const path = require("node:path");

const commands = new commandBuilders({
	name: path.parse(__filename).name, // Tên Lệnh chính
	usage: path.parse(__filename).name, // Cách sử dụng khi dùng lệnh help.
	category: path.parse(__dirname).name, // thể loại lệnh
	aliases: [], // lệnh phụ
	description: "", // mô tả dành cho lệnh
	cooldown: 5, // thời gian hồi lệnh
	owner: false, // bật tắt chế độ dev
	permissions: [] // quyền hạn khi sử dụng lệnh
}).addCommand(async (client, message, args, prefix) => {
	const opponent = message.mentions.users.first();
	const positions = {
		three: '_ _        :levitate: :point_right:      **3**        :point_left: :levitate:',
		two: '_ _        :levitate: :point_right:      **2**        :point_left: :levitate:',
		one: '_ _        :levitate: :point_right:      **1**        :point_left: :levitate:',
		go: '_ _        :levitate: :point_right:      **GO!**        :point_left: :levitate:',
		ended1: '_ _     :levitate: :point_right:      **STOP!**        :skull_crossbones: :levitate:',
		ended2: '_ _     :levitate: :skull_crossbones:      **STOP!**        :point_left: :levitate:',
	};
	const duel = await message.reply({
		content: positions.three,
		components: [action = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('shoot1')
				.setLabel('shoot!')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId('doesnt Matter')
				.setLabel('\u200b')
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(true),
			new ButtonBuilder()
				.setCustomId('shoot2')
				.setLabel('shoot!')
				.setStyle(ButtonStyle.Danger)
				.setDisabled(true),
		)
		],
	});
	function countdown() {
		setTimeout(() => {
			duel.edit({ content: positions.two });
		}, 1000);
		setTimeout(() => {
			duel.edit({ content: positions.one });
		}, 2000);
		setTimeout(() => {
			duel.edit({
				content: positions.go,
				components: [action = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('shoot1')
						.setLabel('shoot!')
						.setStyle(ButtonStyle.Primary)
						.setDisabled(false),
					new ButtonBuilder()
						.setCustomId('doesnt Matter')
						.setLabel('\u200b')
						.setStyle(ButtonStyle.Secondary)
						.setDisabled(false),
					new ButtonBuilder()
						.setCustomId('shoot2')
						.setLabel('shoot!')
						.setStyle(ButtonStyle.Danger)
						.setDisabled(false),
				)
				],
			});
		}, 3000);
	}
	countdown();
	client.on('interactionCreate', async (interaction) => {
		if (interaction.isButton()) {
			if (interaction.customId === 'shoot1' && interaction.member.id === message.author.id) {
				duel.edit({
					content: positions.ended1,
					components: [
						action = new ActionRowBuilder()
							.addComponents(
								new ButtonBuilder()
									.setCustomId('shoot1')
									.setLabel('shoot!')
									.setStyle(ButtonStyle.Primary)
									.setDisabled(true),
								new ButtonBuilder()
									.setCustomId('doesnt Matter')
									.setLabel('\u200b')
									.setStyle(ButtonStyle.Secondary)
									.setDisabled(true),
								new ButtonBuilder()
									.setCustomId('shoot2')
									.setLabel('shoot!')
									.setStyle(ButtonStyle.Danger)
									.setDisabled(true),
							)
					],
				});
				await message.channel.send(`<@${message.author.id}> won!`);
			}
			if (interaction.customId === 'shoot2' && interaction.member.id === opponent.id) {
				duel.edit({
					content: positions.ended2,
					components: [
						action = new ActionRowBuilder()
							.addComponents(
								new ButtonBuilder()
									.setCustomId('shoot1')
									.setLabel('shoot!')
									.setStyle(ButtonStyle.Primary)
									.setDisabled(true),
								new ButtonBuilder()
									.setCustomId('doesnt Matter')
									.setLabel('\u200b')
									.setStyle(ButtonStyle.Secondary)
									.setDisabled(true),
								new ButtonBuilder()
									.setCustomId('shoot2')
									.setLabel('shoot!')
									.setStyle(ButtonStyle.Danger)
									.setDisabled(true),
							)
					],
				});
				await message.channel.send(`<@${opponent.id}> won!`);
			}
		}
	});
});
// console.log(data.toJSON()); // hiển thị thông tin lệnh ở dạng JSON
module.exports = commands;                 