const router = require("express").Router();
const paper = require("../controllers/paperController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

router.get("/", auth, paper.getPapers);

router.post("/create", auth, upload.single("pdf"), paper.createPaper);

router.get("/delete/:id", auth, paper.deletePaper);

module.exports = router;