const router = require("express").Router();
let Share = require("../models/Share.js");

// get all shares
router.route("/").get((req, res) => {
  Share.find({})
    .then((shares) => res.json(shares))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get share based on shareID
router.route("/:id").get((req, res) => {
  Share.findOne({ _id: req.params.id })
    .then((share) => res.json(share))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get shares based on userID
router.route("/user/:id").get((req, res) => {
  Share.find({ userID: req.params.id })
    .then((shares) => res.json(shares))
    .catch((err) => res.status(400).json({ Error: err }));
});

// add share
router.route("/").post((req, res) => {
  const body = req.body;
  if (!(body.userID && body.postID)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let share = new Share(body);
  share.dateTimeShared = new Date();
  share.save().then((doc) => res.status(201).send(doc));
});

// update share
router.route("/:id").put((req, res) => {
  Share.updateOne({ _id: req.params.id }, req.body)
    .then((share) => res.json(share))
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete share
router.route("/:id").delete((req, res) => {
  Share.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

module.exports = router;
