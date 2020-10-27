const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

// @desc    Create a Question
// @route   POST /api/question
// @access  ADMIN

exports.createQuestion = asyncHandler(async (req, res, next) => {
  const { questionType, description, options } = req.body;
  const question = await Question.create({
    questionType,
    description,
    options
  });
  return res.status(201).json({
    success: 1,
    message: `Question with id ${question._id} created`,
    data: question
  });
});

// @desc    Get All Questions
// @oute    GET /api/v1/auth/register
// @access  ADMIN

exports.getAllQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.find();
  return res.status(200).json({
    success: 1,
    data: questions
  });
});

// @desc    Get Question By Question ID
// @route   GET /api/question/:qid
// @access  ADMIN
exports.getQuestionById = asyncHandler(async (req, res, next) => {
  const id = req.params.qid;
  const question = await Question.findById(id);
  return res.status(200).json({
    success: 1,
    data: question
  });
});

// @desc    Update Question by Question ID
// @route   PUT /api/question/:qid
// @access  ADMIN
exports.updateQuestionById = asyncHandler(async (req, res, next) => {
  const id = req.params.qid;
  const { questionType, description, options } = req.body;
  const question = await Question.findByIdAndUpdate(id, {
    questionType,
    description,
    options
  });
  return res.status(200).json({
    success: 1,
    data: question
  });
});

// @desc    Delete Question by Question ID
// @route   DELETE /api/question/:qid
// @access  ADMIN
exports.deleteQuestionById = asyncHandler(async (req, res, next) => {
  const id = req.params.qid;
  await Question.findByIdAndDelete(id);
  return res.status(204).json({
    success: 1
  });
});
