const router = require("express").Router();
let Comment = require("../models/Comment.js");

// get all comments
router.route("/").get((req, res) => {
  Comment.find({})
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get comment based on id
router.route("/:id").get((req, res) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Get comments based on postID
router.route("/post/:id").get((req, res) => {
  Comment.find({ postID: req.params.id })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json({ Error: err }));
});

// add a comment
router.route("/").post((req, res) => {
  const body = req.body;
  if (!(body.userID && body.postID && body.text)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let comment = new Comment(body);
  comment.dateTimeCommented = new Date();
  comment.save().then((doc) => res.status(201).send(doc));
});

// update comment
router.route("/:id").put((req, res) => {
  Comment.updateOne({ _id: req.params.id }, req.body)
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete comment
router.route("/:id").delete((req, res) => {
  Comment.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
