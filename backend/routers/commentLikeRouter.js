const router = require("express").Router();
let CommentLike = require("../models/CommentLike");

// Get likes based on commentID
router.route("/comment/:id").get((req, res) => {
  CommentLike.find({ commentID: req.params.id })
    .then((likes) => res.json(likes))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Add like
router.route("/").post(async (req, res) => {
  const body = req.body;
  if (!(body.userID && body.commentID)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let commentlike = await CommentLike.findOne({
    userID: body.userID,
    commentID: body.commentID,
  });
  if (commentlike) {
    return res.status(400).json({ error: "Like already exists" });
  }
  commentlike = new CommentLike(body);
  commentlike.save().then((doc) => res.status(201).send(doc));
});

// Delete like
router.route("/:id").delete((req, res) => {
  CommentLike.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
