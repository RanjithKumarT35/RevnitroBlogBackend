const mongoose = require("mongoose");
const blog = require("../models/blogModel");

const getBlogs = async (req, res) => {
  try {
    let filter = {}; // Initialize an empty filter object
    if (req.query.type !== "all") {
      // If the type parameter is provided in the query string
      filter.type = req.query.type; // Add type filter to the query
    }

    const allBlogs = await blog.find(filter).sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params; // Corrected
    const selectedBlog = await blog.findById(id);
    res.status(200).json(selectedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createBlog = async (req, res) => {
  try {
    const newData = req.body;
    const newBlog = await blog.create(newData);
    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const editBlog = async (req, res) => {
  try {
    const newData = req.body;
    const { id } = req.params;
    const updatedBlog = await blog.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await blog.findByIdAndDelete(id);
    res.status(200).send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("count added");
    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes field by 1
      { new: true }
    );
    return updatedBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment the views field by 1
      { new: true }
    );
    return updatedBlog;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getBlog,
  getBlogs,
  createBlog,
  editBlog,
  deleteBlog,
  updateLikes,
  updateViews,
};
