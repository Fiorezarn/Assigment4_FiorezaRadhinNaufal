const express = require("express");
const router = express.Router();
const {
  getAllSchedules,
  createSchedules,
} = require("@/controllers/schedules.controller");

router.get("/", getAllSchedules);
router.post("/", createSchedules);

module.exports = router;
