const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

const Quiz = require("../models/Quiz");
// @desc    Create a Quiz
// @route   POST /api/quiz
// @access  ADMIN

exports.createQuiz = asyncHandler(async (req, res, next) => {
  const { name, description, questionIds, status } = req.body;

  // Check if quiz already exists
  const isFound = await Quiz.findOne({ name });
  if (isFound) return next(new ErrorResponse("Quiz already exists", 409));
  const quiz = await Quiz.create({
    name,
    description,
    questionIds,
    status
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
  const allQuiz = await Quiz.find().populate("questionIds");

  // .aggregate({
  //   $project: { NumberOfItemsInArray: { $size: "$questionIds" } }
  // });
  return res.status(200).json({
    success: 1,
    data: allQuiz
  });
});

// @desc    Get Quiz By quiz ID
// @route   GET /api/quiz/:qid
// @access  ADMIN
exports.getQuizById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const quiz = await Quiz.findById(id).populate("questionIds");
  return res.status(200).json({
    success: 1,
    data: quiz
  });
});

// @desc    Update Quiz by Quiz ID (Assign/Unassign)
// @route   PUT /api/quiz/:qid
// @access  ADMIN
exports.updateQuizById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log("ID", id);
  const quizObject = {};
  if (req.body.name) quizObject.name = req.body.name;
  if (req.body.description) quizObject.description = req.body.description;
  if (req.body.type === "assign")
    quizObject.$addToSet = { questionIds: req.body.questionIds };
  else quizObject.$pullAll = { questionIds: req.body.questionIds };
  if (req.body.questionIds) console.log("QUIZ OBJECT", quizObject);
  const quiz = await Quiz.findByIdAndUpdate(id, quizObject);
  return res.status(201).json({
    success: 1,
    data: quiz
  });
});

// @desc    Delete Question by Question ID
// @route   DELETE /api/question/:qid
// @access  ADMIN
exports.deleteQuizById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Question.findByIdAndDelete(id);
  return res.status(204).json({
    success: 1
  });
});

// Set Quiz to Active/Non-Active
exports.setQuizStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  await Quiz.findOneAndUpdate({ _id: id }, { status });
  return res.status(200).json({
    success: 1
  });
});

// Active and Non-Active quizes
exports.getQuizStats = asyncHandler(async (req, res, next) => {
  const activeQuiz = await Quiz.find({ status: true });
  const nonActiveQuiz = await Quiz.find({ status: false });
  const data = {
    active: activeQuiz.length,
    nonActive: nonActiveQuiz.length
  };
  return res.status(200).json({
    success: 1,
    data
  });
});
