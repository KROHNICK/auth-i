const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../data/db");
const Users = require("../data/models/userModel");

function restricted(req, res, next) {
  const { username, password } = req.headers;
  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Unexpected error."
        });
      });
  } else {
    res.status(500).json({
      message: "Please provide credentials."
    });
  }
}

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
