const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const { log } = require("console");

app.use(express.urlencoded({ extended: true })); // data parse in POST Body
app.set("views engine", "ejs");
app.set("views ", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // css file attached in js
app.use(methodOverride("_method"));
// dataBase Connection st ablish
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}
main()
  .then((res) => {
    console.log("dataBase connection has been sucessfully");
  })
  .catch((err) => console.log(err));

// new route
app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;

  if (!from || !to || !msg) {
    console.log("All field required");
    res.render("form.ejs");
    return;
  }
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    create_at: new Date(),
  });

  newChat
    .save()

    .then((res) => {
      console.log("chat has been sucessfully save");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});
// delete Route

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let chatDelete = await Chat.findByIdAndDelete(id);

  console.log(chatDelete);
  res.redirect("/chats");
});

//update Router
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;
  console.log(newmsg);
  const Updatechat = await Chat.findByIdAndUpdate(
    id,
    { msg: newmsg },
    { runValidators: true, new: true }
  );
  console.log(Updatechat);

  res.redirect("/chats");
});

// edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  const chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
  // console.log(chat);
});

// init routing
app.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  res.render("home.ejs", { chats });
});

// routing Setup
app.get("/", (req, res) => {
  res.render("Root is Working");
});

// server setup
app.listen(8080, () => {
  console.log("app is running on port 8080");
});
