const mongoose = require("mongoose");
const { validate } = require("./product");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, "FirstName must be Three character long "],
    maxLength: [12, "FirstName must not be Three character long "],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, "FirstName must be Three character long "],
    maxLength: [12, "FirstName must not be Three character long "],
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    minLength: [11],
    maxLength: [11],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
