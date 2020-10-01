const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const expressSession = require("express-session");
const app = express();
const port = process.env.PORT || 3000;

const { currentUser } = require("./middleware/log");

const indexRouter = require("./routes");
const campRouter = require("./routes/campgrounds");
const commentRouter = require("./routes/comments");

const Users = require("./models/users");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  expressSession({
    secret: "Cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(currentUser);
app.use(campRouter);
app.use(commentRouter);
app.use(indexRouter);

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//mongodb://yelp:pass123@ds141294.mlab.com:41294/heroku_6rj5s3ls

app.listen(port, () => console.log("Listening on Port " + port));

//rtok