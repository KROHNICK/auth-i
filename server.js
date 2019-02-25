const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.get("/api", (req, res) => {
  res.send("Server works.");
});

module.exports = server;
