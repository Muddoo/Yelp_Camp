const mongoose = require("mongoose");

const campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Camp", campSchema);
