const express = require("express");
const {
  getAllResults,
  getScorebyEmployee,
  getAttemptStats,
  getQuizStats
} = require("../controllers/result");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllResults);
router.get("/:eid", getScorebyEmployee);
router.get("/user/stats", getAttemptStats);
router.get("/quiz/stats", getQuizStats);

// router.delete("/:qid", deleteQuestion);

module.exports = router;
