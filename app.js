require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected (Local Compass)"))
  .catch(err => console.log("MongoDB Error:", err));

// 🔹 Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// 🔹 View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔹 Routes
app.use("/", require("./routes/auth"));
app.use("/papers", require("./routes/papers"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/profile", require("./routes/profile"));

// 🔹 Default Route
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 🔹 Error Handling
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// 🔹 Start Server (NO open() here ❌)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});