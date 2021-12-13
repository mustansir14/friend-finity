var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var commentSchema = new Schema({
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
  text: {
    type: String,
    required: true,
  },
  dateTimeCommented: {
    type: Date,
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model("Comment", commentSchema);
