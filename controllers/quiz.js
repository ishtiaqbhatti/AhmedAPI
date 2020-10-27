const asyncHandler = require("../middleware/async");

const Quiz = require("../models/Quiz");
// @desc    Create a Quiz
// @route   POST /api/quiz
// @access  ADMIN

exports.createQuiz = asyncHandler(async (req, res, next) => {
  const { name, description, questionIds } = req.body;
  const quiz = await Quiz.create({
    name,
    description,
    questionIds
  });
  return res.status(201).json({
    success: 1,
    message: `Quiz with id ${quiz._id} created`,
    data: quiz
  });
});

// @desc    Get All Quiz
// @route   GET /api/quiz
// @access  ADMIN

exports.getAllQuiz = asyncHandler(async (req, res, next) => {
  const questions = await Quiz.find().aggregate({
    $project: { NumberOfItemsInArray: { $size: "$questionIds" } }
  });
  return res.status(200).json({
    success: 1,
    data: questions
  });
});

// @desc    Get Quiz By quiz ID
// @route   GET /api/quiz/:qid
// @access  ADMIN
exports.getQuizById = asyncHandler(async (req, res, next) => {
  const id = req.params.qid;
  const quiz = await Quiz.findById(id).populate("questionIds");
  return res.status(200).json({
    success: 1,
    data: quiz
  });
});

// @desc    Update Quiz by Quiz ID
// @route   PUT /api/quiz/:qid
// @access  ADMIN
exports.updateQuizById = asyncHandler(async (req, res, next) => {
  const id = req.params.qid;
  const quizObject = {};
  if (req.body.name) quizObject.name = req.body.name;
  if (req.body.description) quizObject.description = req.body.description;
  if (req.body.questionIds)
    quizObject.$addToSet = { questionIds: req.body.questionIds };

  const quiz = await Quiz.findByIdAndUpdate(id, {
    quizObject
  });
  return res.status(200).json({
    success: 1,
    data: quiz
  });
});

// @desc    Delete Question by Question ID
// @route   DELETE /api/question/:qid
// @access  ADMIN
// exports.deleteQuestionById = asyncHandler(async (req, res, next) => {
//   const id = req.params.qid;
//   await Question.findByIdAndDelete(id);
//   return res.status(204).json({
//     success: 1
//   });
// });
