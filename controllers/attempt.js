const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

const Attempt = require("../models/Attempt");
const Result = require("../models/Result");
// @desc    Create a Quiz
// @route   POST /api/quiz
// @access  ADMIN

exports.createAttempt = asyncHandler(async (req, res, next) => {
  const { quizId, employeeId, questionId, answer } = req.body;
  const attempt = Question.findOne({ "options.text": answer });

  const createdAttempt = Attempt.create({
    quizId,
    employeeId,
    questionId,
    attempt: attempt.isCorrect
  });

  // Create Result in case of no result found

  const resultFound = Result.findOne({ $and: [{ quizId }, { employeeId }] });
  if (!resultFound) {
    const createResult = await Result.create({
      quizId,
      employeeId,
      $push: { attemptIds: createdAttempt._id },
      score: attempt.isCorrect ? 1 : 0
    });
  } else {
    const updatedResult = Result.findOneAndUpdate(
      { _id: resultFound._id },
      {
        score: attempt.isCorrect ? score++ : score--
      },
      {
        $addToSet: { attemptIds: createdAttempt._id }
      }
    );
  }

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
