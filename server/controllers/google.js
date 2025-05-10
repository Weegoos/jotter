import dotenv from "dotenv";
import User from "../schemas/userSchemas.js";
import crypto from "crypto";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "fallback-id";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "fallback-secret";

export default function setupGoogleAuth(app) {
  const sessionSecret = generateSessionSecret();

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { displayName, emails } = profile;
          const email = emails[0].value;

          const existingUser = await User.findOne({ where: { email } });

          if (existingUser) {
            return done(null, { ...existingUser, accessToken });
          } else {
            const newUser = await User.create({
              fullname: displayName,
              email: email,
              password: null,
            });

            console.log("AccessToken:", accessToken);

            return done(null, { ...newUser, accessToken });
          }
        } catch (error) {
          console.error("Ошибка при создании пользователя: ", error);
          return done(error);
        }
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      if (req.user && req.user.accessToken) {
        const accessToken = req.user.accessToken;

        res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 3600 * 1000,
        });

        res.redirect(`${process.env.CLIENT_URL}#/login`);
      } else {
        console.log("Ошибка: accessToken не найден");
        res.redirect("http://localhost:9000/#/login");
      }
    }
  );
}
