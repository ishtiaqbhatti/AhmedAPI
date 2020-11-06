const express = require("express");
const { createAttempt, getAllAttempts } = require("../controllers/attempt");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/attempt:
 *  post:
 *    tags:
 *     - Attempt
 *    description: Creates a new attempt
 *    parameters:
 *     - in: body
 *       name: attemptData
 *       description: The attempt to create
 *       schema:
 *         type: object
 *         required:
 *           - quizId
 *             questionId
 *             answer
 *         properties:
 *           quizId:
 *             type: string
 *           questionId:
 *             type: string
 *           answer:
 *             type: string
 *    responses:
 *      '201':
 *        description: Attempt created
 *      '409':
 *        description: Attempt already exists
 *      '400':
 *        description: Bad request
 */
router.post("/", createAttempt);
/**
 * @swagger
 * /api/attempt:
 *  get:
 *    tags:
 *     - Attempt
 *    description: Use to get all attempts
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", getAllAttempts);
module.exports = router;
