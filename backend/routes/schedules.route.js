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

router.get("/", getAllSchedules);
router.get("/:id", getByIdSchedules);
router.post("/", bodyvalidation, checkDuplicates, createSchedules);
router.put("/:id", bodyvalidation, checkDuplicates, updateSchedule);
router.patch("/:id", updateIsDeleteSchedules);
router.delete("/:id", deleteSchedules);

module.exports = router;
