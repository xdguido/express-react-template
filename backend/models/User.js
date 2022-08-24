const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a display name"],
    },
    image_url: {
      type: String,
    },
    password: {
      type: String,
    },
    verified_email: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
