const LocalStrategy = require('passport-local');
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
};
