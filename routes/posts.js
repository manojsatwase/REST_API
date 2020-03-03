const express = require("express");
const router = express.Router();
// models import
const Post = require("../models/Post");

// get back all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// new feature ES6 async and await
// create post
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({
    title,
    description
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// specific post

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
// delete specific post

router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

/* 
try {
   db.restaurant.updateMany(
      { violations: { $gt: 4 } },  //Your Condition
      { $set: { "Review" : true } }  //YOUR JSON contents
   ); 
} catch (e) {
   print(e);
}
*/

// update many
router.patch("/:post", async (req, res) => {
  try {
    const updateManyPost = await Post.updateMany(
      { title: "post two" },
      { $set: { title: req.body.title } }
    );
    res.json(updateManyPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete many

// get back all post
router.delete("/", async (req, res) => {
  try {
    const posts = await Post.deleteMany({});
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

/* router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  post
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});
 */

module.exports = router;
