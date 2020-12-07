require("dotenv").config();
const express = require("express"),
  app = express(),
  todoRoutes = require("./routes/todos");
var db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("App Started " + process.env.PORT);
});
