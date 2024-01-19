const passport = require("passport");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error("please provide username, email, and password.");
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("user with that email already exists.");
  }

  const newUser = await User.create({ username, email, password });

  req.login(newUser, (err) => {
    if (err) {
      throw new Error(err);
    }
    res.status(201);
    return res.json({
      msg: "you're registered!",
      user: { ...newUser._doc, password: undefined },
    });
  });
};

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ msg: "incorrect email or password" });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        msg: "you are now logged in",
        user: { ...user._doc, password: undefined },
      });
    });
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "an error occurred during logout" });
    }
    res.status(200).json({ msg: "you are now logged out." });
  });
};

module.exports = { register, login, logout };
