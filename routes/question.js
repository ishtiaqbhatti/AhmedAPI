const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getAllQuestionsScore,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById
} = require("../controllers/question");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/score", getAllQuestionsScore);
router.get("/:qid", getQuestionById);
router.put("/:qid", updateQuestionById);
router.delete("/:qid", deleteQuestionById);

module.exports = router;
