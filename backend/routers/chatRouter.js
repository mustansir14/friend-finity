const router = require("express").Router();
let Chat = require("../models/Chat.js");

// Get all chat messages between two users

router.route("/:user1id/:user2id").get((req, res) => {
  Chat.find({
    $or: [
      { sendUserID: req.params.user1id, recieveUserID: req.params.user2id },
      { sendUserID: req.params.user2id, recieveUserID: req.params.user1id },
    ],
  })
    .then((chats) => res.json(chats))
    .catch((err) => res.status(400).json({ Error: err }));
});

// add message
router.route("/").post((req, res) => {
  const body = req.body;
  if (
    !(
      body.sendUserID &&
      body.recieveUserID &&
      body.messageText &&
      body.sendDateTime
    )
  ) {
    return res.status(400).send({ error: "required field(s) missing" });
  }
  let chat = new Chat(body);
  chat.recieveDateTime = new Date();
  chat.save().then((doc) => res.status(201).send(doc));
});

// update message
router.route("/:id").put((req, res) => {
  Chat.updateOne({ _id: req.params.id }, req.body)
    .then((chat) => res.json(chat))
    .catch((err) => res.status(400).json({ Error: err }));
});

// delete message
router.route("/:id").delete((req, res) => {
  Chat.deleteOne({ _id: req.params.id }).then((doc) =>
    res.status(201).send(doc)
  );
});
module.exports = router;
