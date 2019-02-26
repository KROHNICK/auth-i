const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../data/db");
const Users = require("../data/models/userModel");

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Please provide proper creds." });
  }
}

router.post("/", restricted, (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res
          .status(200)
          .json({
            message: `Welcome ${
              user.username
            }! Successfully logged in, here's a cookie.`
          });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
