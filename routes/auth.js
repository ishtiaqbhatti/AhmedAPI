const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {
  registerUser,
  login,
  logout,
  getUsers,
  getUserById,
  getUserStats,
  updateUserById,
  deleteUserById
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    tags:
 *     - Auth
 *    description: Creates a new user
 *    parameters:
 *     - in: body
 *       name: userData
 *       description: The user to create
 *       schema:
 *         type: object
 *         required:
 *           - userName
 *             password
 *             role
 *         properties:
 *           userName:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           department:
 *             type: string
 *    responses:
 *      '201':
 *        description: User created
 *      '409':
 *        description: User already exists
 *      '400':
 *        description: Bad request
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags:
 *     - Auth
 *    description: Login User
 *    parameters:
 *     - in: body
 *       name: user
 *       description: User creds
 *       schema:
 *         type: object
 *         required:
 *           - userName
 *             password
 *         properties:
 *           userName:
 *             type: string
 *           password:
 *             type: string
 *    responses:
 *      '200':
 *        description: Successfully Token returned
 *      '401':
 *        description: Invalid Credentials
 *      '400':
 *        description: Bad request
 */
router.post("/login", login);
router.post("/logout", logout);
/**
 * @swagger
 * /api/auth/users:
 *  get:
 *    tags:
 *     - User
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/users", getUsers);
/**
 * @swagger
 * /api/auth/users/stats:
 *  get:
 *    tags:
 *     - User
 *    description: Get number of users by each role
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
router.get("/users/stats", getUserStats);
/**
 * @swagger
 * /api/auth/user/{id}:
 *  get:
 *    tags:
 *     - User
 *    description: Get a user by ID
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
router.get("/user/:id", getUserById);

/**
 * @swagger
 * /api/auth/user/{id}:
 *  put:
 *    tags:
 *     - User
 *    description: Update User by ID
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: ObjectId
 *       required: true
 *       description: Mongoose Object ID
 *     - in: body
 *       name: userData
 *       description: User creds
 *       schema:
 *         type: object
 *         properties:
 *           userName:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           department:
 *             type: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 */
router.put("/user/:id", updateUserById);
/**
 * @swagger
 * /api/auth/user/{id}:
 *  delete:
 *    tags:
 *     - User
 *    description: Delete User By Id
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
router.delete("/user/:id", deleteUserById);
module.exports = router;
