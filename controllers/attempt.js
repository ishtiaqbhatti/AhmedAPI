const asyncHandler = require("../middleware/async");
const Question = require("../models/Question");

const Attempt = require("../models/Attempt");
const Result = require("../models/Result");

exports.createAttempt = asyncHandler(async (req, res, next) => {
  const { quizId, questionId, answer } = req.body;
  const question = await Question.findById(questionId);
  const attemptResult = question.options.filter(
    (option) => option.text === answer
  );

  const createdAttempt = await Attempt.create({
    quizId,
    employeeId: req.user._id,
    questionId,
    attempt: attemptResult[0].isCorrect
  });
  console.log("CREATEDATTEMPT", createdAttempt);
  // Create Result in case of no result found

  const resultFound = await Result.findOne({
    $and: [{ quizId }, { employeeId: req.user._id }]
  });
  if (!resultFound) {
    const createResult = await Result.create({
      quizId,
      employeeId: req.user._id,
      score: attemptResult[0].isCorrect ? 1 : 0,
      attemptIds: [createdAttempt._id]
    });
  } else {
    let score = resultFound.score;
    if (attemptResult[0].isCorrect) score = score + 1;
    const updatedResult = await Result.findOneAndUpdate({
      _id: resultFound._id,
      score,
      $addToSet: { attemptIds: createdAttempt._id }
    });
  }

  return res.status(200).json({
    success: 1,
    data: updatedResult
  });
});

exports.getAllAttempts = asyncHandler(async (req, res, next) => {
  const attemps = await Attempt.find({}).populate(
    "quizId employeeId questionId"
  );
  return res.status(200).json({
    success: 1,
    data: attemps
  });
});
