var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var friendSchema = new Schema({
  user1ID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2ID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateRequested: {
    type: Date,
    required: true,
  },
  dateAccepted: Date,
});

// Compile model from schema
module.exports = mongoose.model("Friend", friendSchema);
