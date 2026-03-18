const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed, role });

  res.redirect("/login");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("Invalid Email");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.send("Invalid Password");

  req.session.user = user;
  user.lastLogin = new Date();
  await user.save();

  res.redirect("/dashboard");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};