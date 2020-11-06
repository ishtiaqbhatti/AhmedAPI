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

/**
 * @swagger
 * /api/quiz:
 *  post:
 *    tags:
 *     - Quiz
 *    description: Creates a new quiz
 *    parameters:
 *     - in: body
 *       name: quizData
 *       description: The Quiz object to create
 *       schema:
 *         type: object
 *         required:
 *           - name
 *             description
 *             questionIds
 *             status
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           questionIds:
 *             type: array
 *           status:
 *             type: boolean
 *    responses:
 *      '201':
 *        description: Quiz Created
 *      '409':
 *        description: Quiz already exists
 *      '400':
 *        description: Bad request
 */
router.post("/", createQuiz);
/**
 * @swagger
 * /api/quiz:
 *  get:
 *    tags:
 *     - Quiz
 *    description: Get All Quiz's
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", getAllQuiz);
/**
 * @swagger
 * /api/quiz/{id}:
 *  get:
 *    tags:
 *     - Quiz
 *    description: Get a quiz by ID
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
router.get("/:id", getQuizById);

/**
 * @swagger
 * /api/quiz/all/stats:
 *  get:
 *    tags:
 *     - Quiz
 *    description: Get Quiz Stats (Active/Non-Active)
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 */
router.get("/all/stats", getQuizStats);

/**
 * @swagger
 * /api/quiz/{id}:
 *  put:
 *    tags:
 *     - Quiz
 *    description: Update a Quiz by ID
 *    parameters:
 *     - in: body
 *       name: quizData
 *       description: The Quiz object to create
 *       schema:
 *         type: object
 *         required:
 *           - name
 *             description
 *             questionIds
 *             status
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           questionIds:
 *             type: array
 *           status:
 *             type: boolean
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *    responses:
 *      '201':
 *        description: Quiz Updated
 *      '409':
 *        description: Quiz already exists
 *      '400':
 *        description: Bad request
 */
router.put("/:id", updateQuizById);
/**
 * @swagger
 * /api/quiz/status/{id}:
 *  put:
 *    tags:
 *     - Quiz
 *    description: Update Quiz Status
 *    parameters:
 *     - in: body
 *       name: quizData
 *       description: The Quiz object to create
 *       schema:
 *         type: object
 *         required:
 *             status
 *         properties:
 *           status:
 *             type: boolean
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *    responses:
 *      '201':
 *        description: Quiz status Updated
 *      '400':
 *        description: Bad request
 */
router.put("/status/:id", setQuizStatus);
/**
 * @swagger
 * /api/quiz/{id}:
 *  delete:
 *    tags:
 *     - Quiz
 *    description: Delete Quiz by ID
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

router.delete("/:qid", deleteQuizById);

module.exports = router;
