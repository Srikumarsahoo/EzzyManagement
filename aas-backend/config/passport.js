const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter-oauth2").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  // === GOOGLE STRATEGY ===
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback",
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

  // === TWITTER STRATEGY (OAuth 2.0) ===
  passport.use(
    new TwitterStrategy(
      {
        clientID: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL || "http://localhost:5000/api/auth/twitter/callback",
        scope: ["tweet.read", "users.read", "offline.access"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Twitter sometimes does not give email → create fallback
          let email = profile.emails?.[0]?.value || `${profile.id}@twitter.com`;

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({
              name: profile.displayName || profile.username,
              username: profile.username || `twitter_${profile.id}`,
              email,
              password: null,
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

  // Serialize / Deserialize
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
