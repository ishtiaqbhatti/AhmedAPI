const express = require("express");
const { createAttempt, getAllAttempts } = require("../controllers/attempt");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createAttempt);
router.get("/", getAllAttempts);
// router.post("/logout", logout);

module.exports = router;
