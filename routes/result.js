const express = require("express");
const {
  getAllResults,
  getScorebyEmployee,
  getEmployeeAttemptStats,
  getQuizStats,
  getResultsByQuizId
} = require("../controllers/result");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/result:
 *  get:
 *    tags:
 *     - Result
 *    description: Get All Results
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/", getAllResults);
/**
 * @swagger
 * /api/result/employee/{id}:
 *  get:
 *    tags:
 *     - Result
 *    description: Get results by Employee ID
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 */
router.get("/employee/:id", getScorebyEmployee);
/**
 * @swagger
 * /api/result/employee/all/stats:
 *  get:
 *    tags:
 *     - Result
 *    description: Get All Attempt Stats by Users
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/employee/all/stats", getEmployeeAttemptStats);

/**
 * @swagger
 * /api/result/quiz/stats:
 *  get:
 *    tags:
 *     - Result
 *    description: Get Quiz Result Stats
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/quiz/stats", getQuizStats);

// router.delete("/:qid", deleteQuestion);

module.exports = router;
