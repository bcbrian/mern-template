const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

const { UsersById } = require("../../database");


router.post("/public", (req, res) => {
  console.log(req.body);
  res.json({msg: "Public route works."})
});

router.post('/private', passport.authenticate('jwt', { session: false }),
  function(req, res) {
    console.log("authed")
    res.json({msg: "Private route works."})
  }
);

// router.post("/private", (req, res) => {
//   console.log("auth user => ", req.user);
//   // verify a token symmetric
//   try{
//     jwt.verify(
//       req.headers.authorization.split(" ")[1],
//       keys.secretOrKey,
//       function(err, decoded) {
//         console.log("err =>", err); // bar
//         if(err){
//           return res.json({msg: "You are not authenticated."})
//         }
//         console.log("mega =>", decoded); // bar
//         const userId = decoded.id;
//         if(UsersById[userId]){
//           res.json({msg: "Private route works."})
//         } else {
//           res.json({msg: "You are not authenticated."})
//         }
  
//       }
//     );
//   }catch(e){
//     return res.json({msg: "You are not authenticated."})
//   }
  
// });


module.exports = router;
