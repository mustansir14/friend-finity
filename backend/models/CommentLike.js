var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var commentLikeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentID: {
    type: Schema.Types.ObjectId,
    ref: "comment",
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model("CommentLike", commentLikeSchema);
