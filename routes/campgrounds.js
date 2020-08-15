const express = require("express");
const router = express.Router();

const { isLogged } = require("../middleware/log");
const CampGrounds = require("../models/campgrounds");
const Users = require("../models/users");

router.get("/campgrounds", async (req, res) => {
  const campgrounds = await CampGrounds.find();
  res.render("campgrounds", { campgrounds });
});

router.get("/campgrounds/new", isLogged, (req, res) => res.render("new"));

router.get("/campgrounds/:id", async (req, res) => {
  try {
    const camp = await CampGrounds.findById(req.params.id);
    const popCamp = await camp.execPopulate(["comments", "author"]);
    const allowComment = popCamp.comments.every((comment) =>
      req.user ? comment.author !== req.user.username : true
    );
    res.render("show", { popCamp, allowComment });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/campgrounds/edit/:id", isLogged, async (req, res) => {
    const camp =  await CampGrounds.findById(req.params.id);
    if (camp.author ? camp.author.equals(req.user._id) : false)
    return res.render("editCampground", { camp });
    res.redirect("back");
});

router.post("/campgrounds", isLogged, async (req, res) => {
  req.body.author = await Users.findById(req.user._id);
  await CampGrounds.create(req.body);
  res.redirect("/campgrounds");
});

router.put("/campgrounds/:id", isLogged, async (req, res) => {
  await CampGrounds.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/campgrounds/" + req.params.id);
});

router.delete("/campgrounds/:id", isLogged, async (req, res) => {
  const camp = await CampGrounds.findById(req.params.id);
  if (camp.author? camp.author.equals(req.user._id) : false)
    await CampGrounds.findByIdAndDelete(req.params.id);
    return res.redirect(req.get("referrer"));
});

module.exports = router;
