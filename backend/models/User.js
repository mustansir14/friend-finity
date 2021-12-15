var mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicURL: String,
  dateOfBirth: {
    type: Date,
  },
  city: String,
  country: String,
});

// Compile model from schema
module.exports = mongoose.model("User", userSchema);
