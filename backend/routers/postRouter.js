const router = require("express").Router();
let Post = require("../models/Post");

router.route("/").get((req, res) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").get((req, res) => {
  Post.find({ userID: req.params.id })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/").post((req, res) => {
  const body = req.body;
  if (!(body.userID && body.dateTimePosted && body.text)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  post = new Post(body);
  post.save().then((doc) => res.status(201).send(doc));
});

router.route("/:id").delete((req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
