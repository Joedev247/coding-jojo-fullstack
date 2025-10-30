const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

// Configure passport strategies
module.exports = (passport) => {
  // JWT Strategy
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || "fallback-secret",
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  // Google OAuth Strategy (only if configured)
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL ||
            "https://codingjojo-backend.onrender.com/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log("Google OAuth profile:", {
              id: profile.id,
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
            });

            // Check if user already exists
            let existingUser = await User.findOne({
              email: profile.emails[0].value,
            });

            if (existingUser) {
              // Update Google info if user exists
              existingUser.googleId = profile.id;
              existingUser.avatar =
                existingUser.avatar || profile.photos[0]?.value;
              existingUser.isEmailVerified = true;
              await existingUser.save();
              console.log(
                "Updated existing user with Google info:",
                existingUser.email
              );
              return done(null, existingUser);
            }

            // Create new user
            const newUser = new User({
              googleId: profile.id,
              firstName:
                profile.name.givenName ||
                profile.displayName?.split(" ")[0] ||
                "User",
              lastName:
                profile.name.familyName ||
                profile.displayName?.split(" ").slice(1).join(" ") ||
                "",
              name:
                profile.displayName ||
                `${profile.name.givenName || ""} ${
                  profile.name.familyName || ""
                }`.trim() ||
                "User",
              email: profile.emails[0].value,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true, // Google accounts are verified
              role: "student",
            });

            await newUser.save();
            console.log("Created new user from Google OAuth:", newUser.email);
            return done(null, newUser);
          } catch (error) {
            console.error("Google OAuth error:", error);
            return done(error, null);
          }
        }
      )
    );
  }

  // GitHub OAuth Strategy (only if configured)
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL:
            process.env.GITHUB_CALLBACK_URL ||
            "https://codingjojo-backend.onrender.com/api/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log("GitHub OAuth profile received:", {
              id: profile.id,
              username: profile.username,
              displayName: profile.displayName,
              emails: profile.emails,
              photos: profile.photos,
              _json: profile._json
                ? {
                    email: profile._json.email,
                    name: profile._json.name,
                    login: profile._json.login,
                  }
                : "No _json data",
            });

            // Extract email with fallback options
            let email = null;
            if (profile.emails && profile.emails.length > 0) {
              email = profile.emails[0].value;
            } else if (profile._json && profile._json.email) {
              email = profile._json.email;
            }

            // If still no email, we need to handle this case
            if (!email) {
              console.log(
                "No email found in GitHub profile, creating user with username-based email"
              );
              email = `${profile.username}@github.com`; // Fallback email
            }

            // Extract avatar with fallback
            let avatar = null;
            if (profile.photos && profile.photos.length > 0) {
              avatar = profile.photos[0].value;
            } else if (profile._json && profile._json.avatar_url) {
              avatar = profile._json.avatar_url;
            }

            // Extract name with fallback
            const displayName =
              profile.displayName || profile._json?.name || profile.username;
            const firstName = displayName
              ? displayName.split(" ")[0]
              : profile.username;
            const lastName = displayName
              ? displayName.split(" ").slice(1).join(" ")
              : "";

            console.log("Processed GitHub data:", {
              email,
              avatar,
              firstName,
              lastName,
              githubId: profile.id,
            });

            // Check if user already exists
            let existingUser = await User.findOne({
              $or: [{ githubId: profile.id }, { email: email }],
            });

            if (existingUser) {
              // Update GitHub info if user exists
              existingUser.githubId = profile.id;
              if (
                avatar &&
                (!existingUser.avatar || !existingUser.avatar.url)
              ) {
                existingUser.avatar = { url: avatar };
              }
              // Update email if it was a fallback before
              if (
                existingUser.email.includes("@github.com") &&
                !email.includes("@github.com")
              ) {
                existingUser.email = email;
              }
              await existingUser.save();
              console.log(
                "Updated existing user with GitHub info:",
                existingUser.email
              );
              return done(null, existingUser);
            }

            // Create new user
            const newUser = new User({
              githubId: profile.id,
              name: displayName,
              firstName: firstName,
              lastName: lastName,
              email: email,
              avatar: avatar ? { url: avatar } : undefined,
              isEmailVerified: !email.includes("@github.com"), // Only verified if real email
              role: "student",
            });

            await newUser.save();
            console.log("Created new user from GitHub OAuth:", newUser.email);
            return done(null, newUser);
          } catch (error) {
            console.error("GitHub OAuth error:", error);
            return done(error, null);
          }
        }
      )
    );
  }

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
