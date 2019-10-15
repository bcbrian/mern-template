const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GameSchema = new Schema({
  x: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  o: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  currentTurn: {
    type: String,
    required: true,
    default: "x"
  },
  game:{
      type: String,
      required: true,
      default: "_________"
  }
});



module.exports = Game = mongoose.model("games", GameSchema);
