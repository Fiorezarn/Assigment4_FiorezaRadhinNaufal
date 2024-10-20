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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users and their courses
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for users by username
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       us_id:
 *                         type: integer
 *                       us_fullname:
 *                         type: string
 *                       us_username:
 *                         type: string
 *                       us_email:
 *                         type: string
 *                       Courses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             cr_id:
 *                               type: integer
 *                             cr_name:
 *                               type: string
 *                             cr_code:
 *                               type: string
 *                             cr_price:
 *                               type: number
 *                             Schedules:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   sc_id:
 *                                     type: integer
 *                                   sc_date:
 *                                     type: string
 *                                   sc_location:
 *                                     type: string
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 us_id:
 *                   type: integer
 *                 us_fullname:
 *                   type: string
 *                 us_username:
 *                   type: string
 *                 us_email:
 *                   type: string
 *                 Courses:
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
 *                       Schedules:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             sc_id:
 *                               type: integer
 *                             sc_date:
 *                               type: string
 *                             sc_location:
 *                               type: string
 */
router.get("/:id", getUsersById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - username
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: The registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 us_id:
 *                   type: integer
 *                 us_fullname:
 *                   type: string
 *                 us_username:
 *                   type: string
 *                 us_email:
 *                   type: string
 */
router.post("/register", bodyvalidationUsers, checkDuplicates, registerUsers);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     us_id:
 *                       type: integer
 *                     us_fullname:
 *                       type: string
 *                     us_username:
 *                       type: string
 *                     us_email:
 *                       type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid password
 */
router.post("/login", loginUsers);

/**
 * @swagger
 * /users/register-course:
 *   post:
 *     summary: Register a course for a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *             properties:
 *               userId:
 *                 type: integer
 *               courseId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Course registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uc_us_id:
 *                   type: integer
 *                 uc_cr_id:
 *                   type: integer
 */
router.post(
  "/register-course",
  bodyValidationUsersCourse,
  checkRegisterCourse,
  registerCourse
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", bodyvalidationUsers, checkDuplicates, updateUsers);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Soft delete (or restore) a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
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
 *         description: User status updated (deleted or restored)
 */
router.patch("/:id", updateisDeleteUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Permanently delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", deleteUser);

module.exports = router;
