const express = require("express");
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

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.get("/users/stats", getUserStats);
router.put("/user/:id", updateUserById);
router.delete("/user/:id", deleteUserById);
module.exports = router;
