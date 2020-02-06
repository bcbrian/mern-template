const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const { Users, UsersByEmail, UsersById } = require("../../database");

// User Schema
// const User = {
//   id: 0, // +1
//   name: "",
//   email: "",
//   password: "",
// };

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = UsersByEmail[req.body.email];
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  } else {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // still needs to be hashed
      id: Users.length
    };

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // Save to DB...
        Users.push(newUser);
        UsersById[newUser.id] = newUser;
        UsersByEmail[newUser.email] = newUser;
        console.log("Users", Users)
        console.log("UsersById", UsersById)
        console.log("UsersByEmail", UsersByEmail)
      });
    });
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  console.log("EMAIL?", email);
  console.log("users?", UsersByEmail);

  // Find user by email
  const user = UsersByEmail[email];
  // Check if user exists
  if (!user) {
    return res.status(404).json({ emailnotfound: "Email not found" });
  }

  // Check password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = {
        id: user.id,
        name: user.name
      };

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 60 // 1 min in seconds NOTE: You want a higher number.
        },
        (err, token) => {
          console.log("USER: > ", user);
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  });
});

module.exports = router;
