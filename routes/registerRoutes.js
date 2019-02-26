const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../data/db");
const Users = require("../data/models/userModel");

router.post("/", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      req.session.user = saved;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
