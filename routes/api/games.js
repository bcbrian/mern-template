const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Game model
const Games = require("../../models/Games");

router.post("/", (req, res) => {
  console.log(req.body);
  Games.create({ x: req.body.x }).then(game => {
    res.json(game);
  });
});

router.get("/my-games/:userId", (req, res) => {
  console.log("happy => ", req.params.userId)
  Games.find({
    $or: [
      {
        x: req.params.userId
      },
      {
        o: req.params.userId
      }
    ]
  }).then(games => {
    res.json({games});
  });
});

module.exports = router;
