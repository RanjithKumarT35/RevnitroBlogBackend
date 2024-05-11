const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Blog",
  }
);
module.exports = mongoose.model("Blog", blogSchema);
