const router = require("express").Router();
let Friend = require("../models/Friend.js");

// Find all friends
router.route("/").get((req, res) => {
  Friend.find({})
    .then((friends) => res.json(friends))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Find friends of a particular user
router.route("/user/:id").get((req, res) => {
  Friend.find({ $or: [{ user1ID: req.params.id }, { user2ID: req.params.id }] })
    .then((friends) =>
      res.json(
        friends.map((friend) => {
          return {
            _id: friend._id,
            userID:
              friend.user1ID.toString() === req.params.id
                ? friend.user2ID
                : friend.user1ID,
          };
        })
      )
    )
    .catch((err) => res.status(400).json({ Error: err }));
});

// Find pending requests of user
router.route("/user/:id/pending").get((req, res) => {
  Friend.find({ user2ID: req.params.id, status: "pending" }).then((friends) =>
    res.json(friends)
  );
});

router.route("/request").post(async (req, res) => {
  const body = req.body;
  if (!(body.user1ID && body.user2ID)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let friend = await Friend.findOne({
    $or: [
      {
        user1ID: body.user1ID,
        user2ID: body.user2ID,
      },
      {
        user1ID: body.user2ID,
        user2ID: body.user1ID,
      },
    ],
  });

  if (friend) {
    return res.status(400).json({ error: "Already requested or friends" });
  }

  friend = new Friend(body);
  friend.dateRequested = new Date();
  friend.status = "pending";
  friend.save().then((doc) => res.status(201).send(doc));
});

// accept a request
router.route("/accept").post(async (req, res) => {
  const body = req.body;
  if (!(body.user1ID && body.user2ID)) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let friend = await Friend.findOne({
    $or: [
      {
        user1ID: body.user1ID,
        user2ID: body.user2ID,
      },
      {
        user1ID: body.user2ID,
        user2ID: body.user1ID,
      },
    ],
  });

  if (friend.status === "accepted") {
    return res.status(400).json({ error: "Already friends" });
  }
  Friend.updateOne(
    { _id: friend._id },
    { status: "accepted", dateAccepted: new Date() }
  )
    .then((friend) => res.json(friend))
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete a friend
router.route("/:id").delete((req, res) => {
  Friend.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});
module.exports = router;
