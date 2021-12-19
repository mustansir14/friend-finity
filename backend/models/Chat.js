var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  sendUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieveUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  sendDateTime: {
    type: Date,
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model("Chat", chatSchema);
