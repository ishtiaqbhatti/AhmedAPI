const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuizById,
  deleteQuizById,
  setQuizStatus,
  getQuizStats
} = require("../controllers/quiz");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuiz);
router.get("/:qid", getQuizById);
router.put("/:qid", updateQuizById);
router.delete("/:qid", deleteQuizById);
router.put("/status/:id", setQuizStatus);
router.get("/stats", getQuizStats);

module.exports = router;
