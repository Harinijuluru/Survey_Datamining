const router = require("express").Router();
const dash = require("../controllers/dashboardController");
const auth = require("../middleware/auth");

// FIXED ROUTE
router.get("/", auth, dash.getDashboard);

module.exports = router;