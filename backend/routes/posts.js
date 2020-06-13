const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.post("", (req, res, next) => {
  const post = new Post({ title: req.body.title, content: req.body.content });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost.id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted" });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Update successful" });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not Found" });
    }
  });
});

module.exports = router;
