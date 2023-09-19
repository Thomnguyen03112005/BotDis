const DiscordRPC = require('discord-rpc');
const fs = require('fs');

const clientId = '1140995742119510117'; // Thay thế bằng ID của ứng dụng Discord của bạn
const startTimestamp = new Date();

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('Connected to Discord RPC');
  setActivity();
});

rpc.login({ clientId }).catch(console.error);

function setActivity() {
  // Đọc tệp data.json
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return;
    }

    try {
      // Parse dữ liệu JSON từ tệp data.json
      const jsonData = JSON.parse(data);

      // Lấy image_url từ dữ liệu JSON
      const image_url = jsonData.image_url;
      const imagesmall = jsonData.imagesmall;
      const description = jsonData.description;
      const title = jsonData.title;

      // Đặt Rich Presence với largeImageKey và smallImageKey dựa trên image_url
      rpc.setActivity({
        details: title,
        state: description,
        largeImageKey: image_url, // Sử dụng image_url làm largeImageKey
        largeImageText: '🤡🤡🤡🤡',
        smallImageKey: imagesmall, // Sử dụng image_url làm smallImageKey
        smallImageText: '🤡🤡🤡🤡',
        instance: false,
        buttons: [
          { label: 'Facebook', url: 'https://www.facebook.com/Thowmm03112005/' },
          {
           label : 'Github', url: "https://github.com/Thomnguyen03112005"
          },
        ],
        
        startTimestamp
      });
    } catch (error) {
      console.error('JSON parsing error:', error);
    }
  });
}
