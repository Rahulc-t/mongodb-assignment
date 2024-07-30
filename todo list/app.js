const express = require("express");
const path = require("path");
const { mongoose } = require("mongoose");
const app = express();
port = 3000;
const sample = require("./models/tododetails.js");
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public/static", "index.html")));
// app.use(express.urlencoded({extended:true}))
const todoList = [];
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/static", "index.html"));
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;
    const result = await sample.create(data);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

app.get("/view", async(req, res) => {
  const data=await sample.find()
  //data=JSON.stringify(data)
  //console.log(data);
  res.json(data)


});

app.put("/:id", async(req, res) => {
  const id = req.params.id;
  // todoList[id] = req.body.todo;
  await sample.updateOne({_id:id},{$set:req.body})
  res.send("updated");
});

app.delete("/:id", async(req, res) => {
  const id = req.params.id;
  await sample.deleteOne({_id:id})
  // res.send(todoList);
});

mongoose.connect("mongodb://localhost:27017/todoList");
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("database connected");
});
