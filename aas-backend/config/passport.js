const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  // === GOOGLE STRATEGY ===
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:5000/auth/google/callback",
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

  // === FACEBOOK STRATEGY ===
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:
          process.env.FACEBOOK_CALLBACK_URL ||
          "http://localhost:5000/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name", "displayName"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Facebook may not always return email
          let email =
            profile.emails?.[0]?.value || `${profile.id}@facebook.com`;

          let user = await User.findOne({ email });

          if (!user) {
            user = new User({
              name:
                profile.displayName ||
                `${profile.name.givenName} ${profile.name.familyName}`,
              username: profile.username || `facebook_${profile.id}`,
              email,
              password: null,
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          console.error("❌ Facebook strategy error:", err);
          return done(err, null);
        }
      }
    )
  );

  // === Serialize / Deserialize ===
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
