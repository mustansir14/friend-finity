const router = require("express").Router();
let User = require("../models/User");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../utils/cloudinary");

// get all users
router.route("/").get((req, res) => {
  User.find({}, { password: 0 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ Error: err }));
});

// get user based on id
router.route("/:id").get((req, res) => {
  User.findOne({ _id: req.params.id }, { password: 0 })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ Error: err }));
});

// update user
router.route("/:id").put(async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  User.updateOne({ _id: req.params.id }, req.body)
    .then((user) => {
      return User.findOne({ _id: req.params.id })
        .then((user) => res.json({ user: user }))
        .catch((error) => console.log(error));
    })
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete user
router.route("/:id").delete((req, res) => {
  User.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

// add user (signup)
router.route("/").post(async (req, res) => {
  const body = req.body;

  if (
    !(
      body.email &&
      body.password &&
      body.gender &&
      body.firstName &&
      body.lastName
    )
  ) {
    return res.status(400).send({ error: "required field(s) missing" });
  }

  let user = await User.findOne({ email: body.email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  if (body.profilePicURL) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(
        body.profilePicURL
      );
      body.profilePicURL =
        "https://res.cloudinary.com/k190173/image/upload/" +
        uploadedResponse.public_id;
    } catch (error) {
      res.status(500).json({ Error: "Error in uploading to cloudinary" });
    }
  }

  // creating a new mongoose doc from user data
  user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login user
router.route("/login").post(async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "success", user: user });
    } else {
      res.status(401).json({ message: "error", error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "error", error: "User does not exist" });
  }
});

module.exports = router;
