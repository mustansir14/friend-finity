var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var friendSchema = new Schema({
  userID1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userID2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: String,
  dateRequested: {
    type: Date,
    required: true,
  },
  dateAccepted: true,
});

// Compile model from schema
module.exports = mongoose.model("Friend", friendSchema);
