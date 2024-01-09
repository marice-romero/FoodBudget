require("dotenv").config();
require("express-async-errors");
const path = require("node:path");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// connect DB
const connectDB = require("./db/connect");

// authenticate user
const { authenticateUser } = require("./middleware/authHandler");

// routers
const authRouter = require("./routes/authRouter");

// error handlers
const { errorHandler } = require("./middleware/errorHandler");

// middleware
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 12 },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collection: "sessions",
    }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passportConfig")(passport);

// routes
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 4001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
