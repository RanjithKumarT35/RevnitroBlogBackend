const express = require("express");
const {
  getBlog,
  getBlogs,
  createBlog,
  editBlog,
  deleteBlog,
  updateLikes,
  updateViews,
} = require("../controllers/blogController");

var router = express.Router();
router.get("/all", getBlogs);
router.get("/get/:id", getBlog);
router.post("/create", createBlog);
router.put("/edit/:id", editBlog);
router.delete("/delete/:id", deleteBlog);
router.put("/like/:id", updateLikes);
router.put("/view/:id", updateViews);
module.exports = router;
