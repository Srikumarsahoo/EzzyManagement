const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  // 🔹 GOOGLE STRATEGY
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = new User({
              name: profile.displayName,
              username: profile.emails[0].value.split("@")[0],
              email: profile.emails[0].value,
              password: null,
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error("❌ Google strategy error:", err);
          return done(err, null);
        }
      }
    )
  );

  // 🔹 TWITTER STRATEGY
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:5000/api/auth/twitter/callback",
        includeEmail: true, // ⚡ important to get user email
      },
      async (token, tokenSecret, profile, done) => {
        try {
          // Twitter may not always provide email → handle safely
          const email = profile.emails && profile.emails.length > 0 
            ? profile.emails[0].value 
            : `${profile.username}@twitter.com`;

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({
              name: profile.displayName,
              username: profile.username,
              email: email,
              password: null, // no password for Twitter users
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error("❌ Twitter strategy error:", err);
          return done(err, null);
        }
      }
    )
  );

  // 🔹 Serialize / Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
