const Client = require("./Events/Client");
const config = require("./config.json");
const fs = require("node:fs");
// require("dotenv").config() // sử dụng process.env trên visual studio code
const client = new Client({
  setMongoURL: process.env.mongourl || config.mongourl,
  setToken: process.env.token || config.token,
});

// chạy các events bên ngoài
fs.readdirSync('./Handlers').forEach((BlackCat) => {
  require(`./Handlers/${BlackCat}`)(client);
});

// khởi động bot
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;


// Chạy các events bên ngoài
fs.readdirSync("./Handlers").forEach((handler) => {
  require(`./Handlers/${handler}`)(client);
});

app.use(express.static("public")); // Đặt thư mục chứa tệp tĩnh (ví dụ: index.html) ở đây

app.post("/run-bot", (req, res) => {
  // Chạy bot ở đây
  // Đặt lệnh khởi động bot ở đây (ví dụ: client.login())

  // Gửi phản hồi về cho trang web (nếu cần)
  res.json({ message: "Bot đang được khởi động." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});