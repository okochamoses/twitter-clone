const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { jwtSecret } = require("./configurationKeys");
const container = require("./DIContainer");

const userRepository = container.cradle.userRepository;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;
opts.failWithError = true;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await userRepository.find(
        { _id: jwt_payload.id },
        { multiple: false }
      );
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "wahala" });
      }
    } catch (e) {
      console.log(e);
      return done(e, false);
    }
  })
);

module.exports = passport;
