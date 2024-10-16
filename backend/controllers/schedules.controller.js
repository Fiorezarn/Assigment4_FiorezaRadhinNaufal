const { Schedules } = require("@/models");

const getAllSchedules = async (req, res) => {
  try {
    const Schedule = await Schedules.findAll();
    return res.status(200).send({
      status: 200,
      message: "success",
      Schedule,
    });
  } catch (error) {
    return res.send(500).send({
      status: 500,
    });
  }
};

const createSchedules = async (req, res) => {
  try {
    const { date, location } = req.body;
    const newSchedules = await Schedules.create({
      sc_date: date,
      sc_location: location,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).send({
      status: 201,
      message: "Create Schedule Succes!",
      newSchedules,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { getAllSchedules, createSchedules };
