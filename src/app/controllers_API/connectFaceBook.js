const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: 'YOUR_APP_ID',
    clientSecret: 'YOUR_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // handle Facebook login callback here
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

module.exports = app;
