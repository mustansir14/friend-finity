const router = require("express").Router();
let Post = require("../models/Post");
const { cloudinary } = require("../utils/cloudinary");

// get all posts
router.route("/").get((req, res) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get post based on postID
router.route("/:id").get((req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get posts based on userID
router.route("/user/:id").get((req, res) => {
  Post.find({ userID: req.params.id })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ Error: err }));
});

// add post
router.route("/").post((req, res) => {
  const body = req.body;
  if (!(body.userID && body.text)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  if (body.imageURL) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(body.imageURL);
      body.imageURL = uploadedResponse.public_id;
    } catch (error) {
      res.status(500).json({ Error: "Error in uploading to cloudinary" });
    }
  }
  let post = new Post(body);
  post.dateTimePosted = new Date();
  post.save().then((doc) => res.status(201).send(doc));
});

// update post
router.route("/:id").put((req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete post
router.route("/:id").delete((req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
