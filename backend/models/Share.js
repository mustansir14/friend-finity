var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var shareSchema = new Schema({
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
  dateTimeShared: {
    type: Date,
    required: true,
  },
});

// Compile model from schema
module.exports = mongoose.model("Share", shareSchema);
