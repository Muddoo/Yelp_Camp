const campgrounds = require("../models/campgrounds");

module.exports = {
  isLogged(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error", "Please Login First !");
    res.redirect(303,"/login");
  },
  isLoggedOut(req, res, next) {
    if (req.isAuthenticated()) return res.redirect(303, "/");
    next();
  },
  currentUser(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash("error")[0];
    next();
  },
};
