const router = require("express").Router();
let Post = require("../models/Post");
let Friend = require("../models/Friend");
let Share = require("../models/Share");
const { cloudinary } = require("../utils/cloudinary");

// get all posts
router.route("/").get((req, res) => {
  Post.find({})
    .then((posts) => res.json(posts.reverse()))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get post based on postID
router.route("/:id").get((req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get posts of a particular user
router.route("/user/:id").get((req, res) => {
  Post.find({ userID: req.params.id })
    .then((posts) => res.json(posts.reverse()))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get posts of all friends of a user + the user + shares by friends itself (the feed basically)
router.route("/feed/:id").get(async (req, res) => {
  const userID = req.params.id;
  const friends = await Friend.find({
    $or: [
      { user1ID: userID, status: "accepted" },
      { user2ID: userID, status: "accepted" },
    ],
  });
  const userIDs = friends.map((friend) => {
    if (friend.user1ID.toString() !== userID) return friend.user1ID;
    else return friend.user2ID;
  });
  userIDs.push(userID);
  const posts = await Post.find({ userID: { $in: userIDs } });
  const shares = await Share.find({ userID: { $in: userIDs } });
  for (let x in shares) {
    console.log(shares[x]);
    let sharedPost = await Post.findOne({ _id: shares[x].postID });
    sharedPost["shared"] = true;
    sharedPost["sharedUserID"] = shares[x].userID;
    sharedPost["dateTimeShared"] = shares[x].dateTimeShared;
    console.log(sharedPost);
    posts.push(sharedPost);
  }
  posts.sort((a, b) => {
    let a_date = a.dateTimePosted;
    let b_date = b.dateTimePosted;
    if (a.shared) a_date = a.dateTimeShared;
    if (b.shared) b_date = b.dateTimeShared;
    return a_date - b_date;
  });
  return res.json(posts.reverse());
});

// add post
router.route("/").post(async (req, res) => {
  const body = req.body;
  if (!(body.userID && (body.text || body.imageURL))) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  if (body.imageURL) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(body.imageURL);
      body.imageURL =
        "https://res.cloudinary.com/k190173/image/upload/" +
        uploadedResponse.public_id;
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
