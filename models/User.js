const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  profilePic: { type: String, default: "default.png" },
  lastLogin: Date,
  papersUploaded: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);