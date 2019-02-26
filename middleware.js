const db = require("./data/db");
const Users = require("./data/models/userModel");

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Please provide proper creds." });
  }
}

module.exports = {
  restricted
};
