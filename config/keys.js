module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost/tictacdb",
  secretOrKey: "secret"
};

console.log("################# >>>>>>>>>>", process.env.MONGO_URI)
