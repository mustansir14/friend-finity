const router = require("express").Router();
let Friend = require("../models/Friend.js");
let User = require("../models/User.js");

// Find all friends
router.route("/").get((req, res) => {
  Friend.find({})
    .then((friends) => res.json(friends))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Find a friend using friend id
router.route("/:id").get((req, res) => {
  Friend.find({ _id: req.params.id })
    .then((friend) => res.json(friend))
    .catch((err) => res.status(400).json({ Error: err }));
});

// Find users which are friends of a particular user
router.route("/user/:id").get((req, res) => {
  const userID = req.params.id;
  Friend.find({
    $or: [{ user1ID: userID }, { user2ID: userID }],
  }).then((friends) => {
    const userIDs = friends.map((friend) => {
      if (friend.user1ID.toString() !== userID) return friend.user1ID;
      else return friend.user2ID;
    });
    return User.find({ _id: { $in: userIDs } }).then((friends) => {
      return res.json(friends);
    });
  });
});

// Fimd users which are not friend of a particular user
router.route("/notUser/:id").get((req, res) => {
  const userID = req.params.id;
  Friend.find({
    $or: [{ user1ID: userID }, { user2ID: userID }],
  }).then((friends) => {
    const userIDs = friends.map((friend) => {
      if (friend.user1ID.toString() !== userID) return friend.user1ID;
      else return friend.user2ID;
    });
    userIDs.push(userID);
    return User.find({ _id: { $nin: userIDs } }).then((notFriends) => {
      return res.json(notFriends);
    });
  });
});

// Find pending requests of user
router.route("/user/:id/pending").get((req, res) => {
  Friend.find({ user2ID: req.params.id, status: "pending" }).then((friends) =>
    res.json(friends)
  );
});

// send a request
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
router.route("/accept/:id").put(async (req, res) => {
  let friend = await Friend.findOne({
    _id: req.params.id,
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
