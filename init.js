const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then((res) => {
    console.log("isWorking");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}

const allChat = [
  {
    from: "himansu",
    to: "hema",
    msg: "hello how are you",
    create_at: new Date().toString(),
  },
  {
    from: "kdskdsdf",
    to: "hekdcma",
    msg: "hello dsjdhow are you",
    create_at: new Date().toString(),
  },
  {
    from: "himdosksansu",
    to: "hecdkcma",
    msg: "hello sdcsdhow are you",
    create_at: new Date().toString(),
  },
];
Chat.insertMany(allChat);
