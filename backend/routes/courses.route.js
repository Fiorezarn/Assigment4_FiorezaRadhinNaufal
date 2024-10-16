const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  createCourses,
  updateCourses,
  addCourseSchedule,
  changeScheduleCourse,
  getCourseById,
} = require("@/controllers/courses.controller");
const { upload } = require("@/controllers/file");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", upload.single("image"), createCourses);
router.put("/:id", upload.single("image"), updateCourses);
router.post("/register-schedule", addCourseSchedule);
router.put("/register-schedule/:id", changeScheduleCourse);

module.exports = router;
