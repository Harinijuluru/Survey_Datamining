const Paper = require("../models/Paper");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  const totalPapers = await Paper.countDocuments();
  const totalUsers = await User.countDocuments();
  const recent = await Paper.find().sort({ createdAt: -1 }).limit(5);

  res.render("dashboard/index", {
    totalPapers,
    totalUsers,
    recent
  });
};