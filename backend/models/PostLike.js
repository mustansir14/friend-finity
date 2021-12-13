var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var postlikeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model("PostLike", postlikeSchema);
