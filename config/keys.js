module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/tictacdb",
  secretOrKey: "secret"
};

console.log("################# >>>>>>>>>>", process.env.MONGODB_URI)
