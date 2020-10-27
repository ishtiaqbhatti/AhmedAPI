const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuizById
} = require("../controllers/quiz");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuiz);
router.get("/:qid", getQuizById);
router.put("/:qid", updateQuizById);
// router.delete("/:qid", deleteQuestion);

module.exports = router;
