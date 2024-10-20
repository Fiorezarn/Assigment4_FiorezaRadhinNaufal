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

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API to manage courses and schedules
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for course name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cr_id:
 *                         type: integer
 *                       cr_name:
 *                         type: string
 *                       cr_code:
 *                         type: string
 *                       cr_price:
 *                         type: number
 *                       cr_desc:
 *                         type: string
 *                       cr_image:
 *                         type: string
 */
router.get("/", getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: The course data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cr_id:
 *                   type: integer
 *                 cr_name:
 *                   type: string
 *                 cr_code:
 *                   type: string
 *                 cr_price:
 *                   type: number
 *                 cr_desc:
 *                   type: string
 *                 cr_image:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       us_id:
 *                         type: integer
 *                       us_fullname:
 *                         type: string
 *                       us_email:
 *                         type: string
 */
router.get("/:id", getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               price:
 *                 type: number
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The created course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cr_id:
 *                   type: integer
 *                 cr_name:
 *                   type: string
 *                 cr_code:
 *                   type: string
 *                 cr_price:
 *                   type: number
 *                 cr_desc:
 *                   type: string
 *                 cr_image:
 *                   type: string
 */
router.post(
  "/",
  upload.single("image"),
  bodyvalidation,
  checkDuplicates,
  createCourses
);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               price:
 *                 type: number
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The updated course
 */
router.put("/:id", upload.single("image"), checkDuplicates, updateCourses);

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: Soft delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Course marked as deleted
 */
router.patch("/:id", updateIsDeleteCourses);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Permanently delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Course deleted
 */
router.delete("/:id", deleteCourses);

/**
 * @swagger
 * /courses/course-schedule:
 *   post:
 *     summary: Add a new course schedule
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *               scheduleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created course schedule
 */
router.post("/course-schedule", addCourseSchedule);

/**
 * @swagger
 * /courses/course-schedule/{id}:
 *   put:
 *     summary: Update an existing course schedule
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *               scheduleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated course schedule
 */
router.put("/course-schedule/:id", changeScheduleCourse);

/**
 * @swagger
 * /courses/course-schedule/{id}:
 *   patch:
 *     summary: Soft delete a course schedule
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Course schedule marked as deleted
 */
router.patch("/course-schedule/:id", updateIsDeleteCoursesSchedule);

/**
 * @swagger
 * /courses/course-schedule/{id}:
 *   delete:
 *     summary: Permanently delete a course schedule
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Course schedule deleted
 */
router.delete("/course-schedule/:id", deleteCourseSchedule);

module.exports = router;
