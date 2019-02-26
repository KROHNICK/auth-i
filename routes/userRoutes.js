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

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
