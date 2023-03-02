const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = "258973467365-rg463ac7tvj4iiu39a1d4jupalbscnn0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const FACEBOOK_APP_ID = "your id";
const FACEBOOK_APP_SECRET = "your id";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});