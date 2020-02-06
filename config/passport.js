const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const { UsersById } = require("../database");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log("PARTY?")
      const user = UsersById[jwt_payload.id];

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
