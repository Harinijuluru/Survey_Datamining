const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
  title: String,
  authors: String,
  category: String,
  abstract: String,
  year: Number,
  keywords: [String],
  pdf: String,
  techniqueType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Paper", PaperSchema);