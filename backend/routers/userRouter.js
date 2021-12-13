const router = require("express").Router();
let User = require("../models/User");
const bcrypt = require("bcrypt");

router.route("/").get((req, res) => {
  User.find({}, { password: 0 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").get((req, res) => {
  User.find({ _id: req.params.id }, { password: 0 })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").put((req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ Error: err }));
});

router.route("/:id").delete((req, res) => {
  User.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});

router.route("/signup").post(async (req, res) => {
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

  // creating a new mongoose doc from user data
  user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

router.route("/login").post(async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

module.exports = router;
