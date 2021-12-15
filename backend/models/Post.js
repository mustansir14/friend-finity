var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var postSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: String,
  dateTimePosted: {
    type: Date,
    required: true,
  },
  imageURL: String,
  videoURL: String,
});

// Compile model from schema
module.exports = mongoose.model("Post", postSchema);
