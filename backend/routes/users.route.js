const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUsers,
  loginUsers,
  getUsersById,
  registerCourse,
  updateisDeleteUser,
  updateUsers,
  deleteUser,
} = require("@/controllers/users.controller");
const {
  bodyvalidationUsers,
  bodyValidationUsersCourse,
  checkRegisterCourse,
  checkDuplicates,
} = require("@/validations/users.validation");

router.get("/", getAllUsers);
router.get("/:id", getUsersById);
router.patch("/:id", updateisDeleteUser);
router.put("/:id", bodyvalidationUsers, checkDuplicates, updateUsers);
router.post("/register", bodyvalidationUsers, checkDuplicates, registerUsers);
router.post("/login", loginUsers);
router.post(
  "/register-course",
  bodyValidationUsersCourse,
  checkRegisterCourse,
  registerCourse
);
router.delete("/:id", deleteUser);

module.exports = router;
