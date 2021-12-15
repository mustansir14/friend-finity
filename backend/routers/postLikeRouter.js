const router = require("express").Router();
let PostLike = require("../models/PostLike");

// Get likes based on postID
router.route("/post/:id").get((req, res) => {
  PostLike.find({ postID: req.params.id })
    .then((likes) => res.json(likes))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Add like
router.route("/").post(async (req, res) => {
  const body = req.body;
  if (!(body.userID && body.postID)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let postlike = await PostLike.findOne({
    userID: body.userID,
    postID: body.postID,
  });
  if (postlike) {
    return res.status(400).json({ error: "Like already exists" });
  }
  postlike = new PostLike(body);
  postlike.save().then((doc) => res.status(201).send(doc));
});

// Delete like
router.route("/:id").delete((req, res) => {
  PostLike.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
