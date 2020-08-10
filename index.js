const fs = require("fs");
const http = require("http");
const url = require("url");

// const text = fs.readFileSync("./txt/text.txt", "utf-8");
// console.log(text);

// const textOut = `hello from in and ehat came from ${text}`;
// const write = fs.writeFileSync("./txt/write.txt", textOut);
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const userObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/home") {
    res.end("this is the home area");
  } else if (pathName === "/users") {
    res.end("this is the user area");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/data/data.json`, "utf-8", (err, data) => {
      const userData = JSON.parse(data);
      res.writeHead(200, {
        "content-typr": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>this path doesnt exist</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server UP and RUNNING on 8000");
});
