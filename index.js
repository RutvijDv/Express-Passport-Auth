//Imports
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var crypto = require("bcryptjs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const routes = require("./routes");

//Port
const PORT = process.env.PORT || 8080;

//SessionStore in mongodb
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGOURL,
  collection: "sessions",
});

//Database Configuration
const dbConfig = require("./config/database.config");
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error connectig MongoDB", err);
  });

//Express setup
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Session Setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

//Passport Authentication
require("./config/passport.config");

app.use(passport.initialize());
app.use(passport.session());

//Debugging
app.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.user);
  next();
});

//Routes
app.use("/", routes);

//Error Handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}

//Launch server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
