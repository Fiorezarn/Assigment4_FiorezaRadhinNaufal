const express = require("express");
const router = express.Router();
const {
  getAllSchedules,
  createSchedules,
  getByIdSchedules,
  deleteSchedules,
  updateSchedule,
  updateIsDeleteSchedules,
} = require("@/controllers/schedules.controller");
const {
  bodyvalidation,
  checkDuplicates,
} = require("@/validations/schedules.validation");

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API for managing schedules
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date to filter schedules
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date to filter schedules
 *     responses:
 *       200:
 *         description: A list of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sc_id:
 *                     type: integer
 *                   sc_date:
 *                     type: string
 *                     format: date
 *                   sc_location:
 *                     type: string
 */
router.get("/", getAllSchedules);

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The schedule ID
 *     responses:
 *       200:
 *         description: A single schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sc_id:
 *                   type: integer
 *                 sc_date:
 *                   type: string
 *                   format: date
 *                 sc_location:
 *                   type: string
 *       404:
 *         description: Schedule not found
 */
router.get("/:id", getByIdSchedules);

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - location
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", bodyvalidation, checkDuplicates, createSchedules);

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Update a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - location
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 */
router.put("/:id", bodyvalidation, checkDuplicates, updateSchedule);

/**
 * @swagger
 * /schedules/{id}:
 *   patch:
 *     summary: Soft delete a schedule (update isDeleted flag)
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isDeleted
 *             properties:
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Schedule soft deleted successfully
 *       404:
 *         description: Schedule not found
 */
router.patch("/:id", updateIsDeleteSchedules);

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The schedule ID
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */
router.delete("/:id", deleteSchedules);

module.exports = router;
