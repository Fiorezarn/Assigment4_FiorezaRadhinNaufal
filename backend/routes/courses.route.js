const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  createCourses,
  updateCourses,
  addCourseSchedule,
  changeScheduleCourse,
  getCourseById,
  updateIsDeleteCourses,
  deleteCourses,
  updateIsDeleteCoursesSchedule,
  deleteCourseSchedule,
} = require("@/controllers/courses.controller");
const {
  checkDuplicates,
  bodyvalidation,
} = require("@/validations/courses.validation");
const { upload } = require("@/controllers/file");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post(
  "/",
  upload.single("image"),
  bodyvalidation,
  checkDuplicates,
  createCourses
);
router.put("/:id", upload.single("image"), checkDuplicates, updateCourses);
router.patch("/:id", updateIsDeleteCourses);
router.delete("/:id", deleteCourses);
router.post("/course-schedule", addCourseSchedule);
router.put("/course-schedule/:id", changeScheduleCourse);
router.patch("/course-schedule/:id", updateIsDeleteCoursesSchedule);
router.delete("/course-schedule/:id", deleteCourseSchedule);

module.exports = router;
