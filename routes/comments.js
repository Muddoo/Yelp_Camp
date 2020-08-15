const express = require("express");
const router = express.Router();

const { isLogged } = require("../middleware/log");
const CampGrounds = require("../models/campgrounds");
const Comments = require("../models/comments");

router.post("/campgrounds/comment/:camp", isLogged, async (req, res) => {
  const comment = await Comments.create(req.body);
  const camp = await CampGrounds.findById(req.params.camp);
  camp.comments.push(comment);
  camp.save();
  res.redirect(req.get("referer"));
});

router.put(
  "/campgrounds/comment/:comment/:author",
  isLogged,
  async (req, res) => {
    if(req.user.username === req.params.author) {
      await Comments.findByIdAndUpdate(req.params.comment, req.body)
      return res.json({success: "Updated Successfully"})
    }
    res.json({danger: `You Can Update Only Your Comment!`})
  }
);

router.delete(
  "/campgrounds/comment/:comment/:author",
  isLogged,
  async (req, res) => {
    req.user.username === req.params.author
      ? await Comments.findByIdAndDelete(req.params.comment)
      : req.flash("error", "You Can Delete Only Your Comment!");
    res.redirect(req.get("Referer"));
  }
);

module.exports = router;
