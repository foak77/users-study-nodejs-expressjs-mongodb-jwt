const express = require("express");
const fs = require("fs");
const app = express();

// const http = require("http");
// const url = require("url");

const usersData = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "SUCCESS",
    data: {
      usersData,
    },
  });
});

// app.post("/", (req, res) => {
//   res.send("you can post in here");
// });

//or put
// app.patch("/", (req, res) => {});

// app.delete("/", (req, res) => {});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
