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

router.get("/", getAllSchedules);
router.get("/:id", getByIdSchedules);
router.post("/", createSchedules);
router.put("/:id", updateSchedule);
router.patch("/:id", updateIsDeleteSchedules);
router.delete("/:id", deleteSchedules);

module.exports = router;
