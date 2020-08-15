const express = require("express");
const passport = require("passport");
const router = express.Router();

const Users = require("../models/users");
const { isLoggedOut } = require("../middleware/log");

router.get("/", (req, res) => res.render("home"));

router.get("/register", isLoggedOut, (req, res) => res.render("register"));
router.get("/login", isLoggedOut, (req, res) => res.render("login"));
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("error", "Successfully Logged Out");
  res.redirect("/campgrounds");
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  Users.register(new Users({ username }), password, (err, user) => {
    if (err) {
      console.log(err.message);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, () => {
        req.flash("error", `Welcome To YelpCamp ${req.user.username}`);
        res.redirect("/campgrounds")
    }
    );
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("error", `Welcome To YelpCamp ${req.user.username}`);
    res.redirect("/campgrounds")
  }
);

router.get("*", (req, res) => res.redirect("/"));

module.exports = router;