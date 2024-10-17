const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUsers,
  loginUsers,
  getAllUsersById,
  registerCourse,
  updateisDeleteUser,
  updateUsers,
  deleteUser,
} = require("@/controllers/users.controller");

router.get("/", getAllUsers);
router.get("/:id", getAllUsersById);
router.patch("/:id", updateisDeleteUser);
router.put("/:id", updateUsers);
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/register-course", registerCourse);
router.delete("/:id", deleteUser);

module.exports = router;
