const express = require("express");
const Posts = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post("/", (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Posts.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedOne = await Posts.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedOne);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;
