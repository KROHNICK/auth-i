const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../data/db");
const Users = require("../data/models/userModel");

router.get("/", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send("Could not logout.");
      } else {
        res.send("Logged out successfully.");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
