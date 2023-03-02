const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '<YOUR_CLIENT_ID>',
  clientSecret: '<YOUR_CLIENT_SECRET>',
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Lưu thông tin người dùng vào CSDL
  console.log(accessToken, refreshToken,profile)
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = {
  googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: passport.authenticate('google', { failureRedirect: '/login' }),
};
