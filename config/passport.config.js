const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const userModel = require('../models/user.model');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    userModel.User.findOne({ email })
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      })
      .catch(() => { done(null, false, { errors: { 'email or password': 'is invalid' } }); });
  }));

  const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  };

  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    userModel.User.findOne({ email: jwtPayload.email })
      .then((user) => {
        if (!user) {
          return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
      })
      .catch(() => { done(null, false, { errors: { 'email or password': 'is invalid' } }); });
  }));
};
