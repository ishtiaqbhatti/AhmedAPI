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

/**
 * @swagger
 * /api/question:
 *  post:
 *    tags:
 *     - Question
 *    description: Creates a new question
 *    parameters:
 *     - in: body
 *       name: questionData
 *       description: The Question object to create
 *       schema:
 *         type: object
 *         required:
 *           - questionType
 *             description
 *             options
 *         properties:
 *           questionType:
 *             type: string
 *           description:
 *             type: string
 *           options:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                isCorrect:
 *                  type: boolean
 *    responses:
 *      '201':
 *        description: Question Created
 *      '409':
 *        description: Question already exists
 *      '400':
 *        description: Bad request
 */

router.post("/", createQuestion);
/**
 * @swagger
 * /api/question:
 *  get:
 *    tags:
 *     - Question
 *    description: Get All Questions
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", getAllQuestions);
/**
 * @swagger
 * /api/question/{id}:
 *  get:
 *    tags:
 *     - Question
 *    description: Get a question by ID
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
router.get("/:id", getQuestionById);
/**
 * @swagger
 * /api/question/all/score:
 *  get:
 *    tags:
 *     - Question
 *    description: Get All Questions Score
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/all/score", getAllQuestionsScore);

/**
 * @swagger
 * /api/question/{id}:
 *  put:
 *    tags:
 *     - Question
 *    description: Update Question by ID
 *    parameters:
 *     - in: body
 *       name: questionData
 *       description: The Question object to create
 *       schema:
 *         type: object
 *         required:
 *           - questionType
 *             description
 *             options
 *         properties:
 *           questionType:
 *             type: string
 *           description:
 *             type: string
 *           options:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                isCorrect:
 *                  type: boolean
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *    responses:
 *      '200':
 *        description: Question Updated
 *      '400':
 *        description: Bad request
 */
router.put("/:id", updateQuestionById);
/**
 * @swagger
 * /api/question/{id}:
 *  delete:
 *    tags:
 *     - Question
 *    description: Delete Question by ID
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *    responses:
 *      '204':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 */
router.delete("/:id", deleteQuestionById);

module.exports = router;
