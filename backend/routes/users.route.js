const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUsers,
  loginUsers,
  getAllUsersById,
  registerCourse,
} = require("@/controllers/users.controller");

router.get("/", getAllUsers);
router.get("/:id", getAllUsersById);
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/register-course", registerCourse);

module.exports = router;
