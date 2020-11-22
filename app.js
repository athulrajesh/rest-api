const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const postsRoute = require("./routes/posts");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/posts", postsRoute);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db!!!");
  }
);
app.listen(3000);
