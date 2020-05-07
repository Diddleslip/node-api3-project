const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const morgan = require('morgan')

const server = express();

server.use(express.json()); // Built in middleware, no need to npm install it
server.use("/api/posts", postRouter);
server.use("/api/users", morgan("dev"), userRouter);
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send(`
      <h1>API HOME</h1>
      <p>Welcome to the API!</p>
  `)
})

//custom middleware

function logger(req, res, next) {
  const date = new Date().toTimeString();
  console.log(`\n${req.method} ${req.url} ${res.statusCode} [${date}]\n`);
  next();
}

module.exports = server;
