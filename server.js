const express = require("express");
const server = express();
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./data/db");
const Users = require("./data/models/userModel");

const userRoutes = require("./routes/userRoutes");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/users", userRoutes);

server.get("/api", (req, res) => {
  res.send("Server works.");
});

server.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/api/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// function restricted(req, res, next) {
//   const { username, password } = req.headers;
//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: "Unexpected error."
//         });
//       });
//   } else {
//     res.status(500).json({
//       message: "Please provide credentials."
//     });
//   }
// }

// server.get("/api/users", restricted, (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

module.exports = server;
