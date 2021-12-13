const router = require("express").Router();
let Comment = require("../models/Comment.js");

router.route("/").get((req, res) => {
  Comment.find({})
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").get((req, res) => {
  Comment.find({ _id: req.params.id })
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Get comments based on postID
router.route("/post/:id").get((req, res) => {
  Comment.find({ postID: req.params.id })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/").post((req, res) => {
  const body = req.body;
  if (!(body.userID && body.postID && body.dateTimeCommented && body.text)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  comment = new Comment(body);
  comment.save().then((doc) => res.status(201).send(doc));
});

router.route("/").put((req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").delete((req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});
