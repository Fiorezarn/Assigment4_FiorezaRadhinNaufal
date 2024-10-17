const { Schedules, Courses, Users } = require("@/models");
const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { where } = require("sequelize");

const getAllSchedules = async (req, res) => {
  try {
    const Schedule = await Schedules.findAll({
      include: [
        {
          model: Courses,
          as: "Courses",
          through: { attributes: [] },
          include: {
            model: Users,
            as: "Users",
            through: { attributes: [] },
          },
        },
      ],
    });
    return successResponseData(res, "Success get all data!", Schedule, 200);
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const findByIdSchedules = async (id) => {
  try {
    const schedule = await Schedules.findOne({
      include: [
        {
          model: Courses,
          as: "Courses",
          through: { attributes: [] },
          include: {
            model: Users,
            as: "Users",
            through: { attributes: [] },
          },
        },
      ],
      where: { sc_id: id },
    });
    return schedule;
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const getByIdSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await findByIdSchedules(id);
    if (!schedule) {
      return errorClientResponse(res, `Schedule with id ${id} not found!`, 404);
    }

    return successResponseData(
      res,
      `Success get schedule with id ${id}!`,
      schedule,
      200
    );
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const createSchedules = async (req, res) => {
  try {
    const { startDate, endDate, location } = req.body;
    const newSchedules = await Schedules.create({
      sc_start_date: startDate,
      sc_end_date: endDate,
      sc_location: location,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return successResponseData(
      res,
      "Create Schedule Succes!",
      newSchedules,
      201
    );
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, location } = req.body;
    const scheduleData = await findByIdSchedules(id);
    console.log(scheduleData, "scheduleData");
    if (!scheduleData) {
      return errorClientResponse(res, `Schedule with id ${id} not found!`, 404);
    }
    await Schedules.update(
      {
        sc_start_date: startDate,
        sc_end_date: endDate,
        sc_location: location,
        updatedAt: new Date(),
      },
      {
        where: { sc_id: id },
      }
    );
    return successResponseData(res, "Update Schedule Succes!");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const updateIsDeleteSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const schedule = await findByIdSchedules(id);
    if (!schedule) {
      return errorClientResponse(res, "Schedule not found", 404);
    }
    await Schedules.update(
      {
        isDeleted: isDeleted,
        updatedAt: new Date(),
      },
      {
        where: { sc_id: id },
      }
    );
    return successResponse(res, "Delete Schedule Succes!");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

const deleteSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await findByIdSchedules(id);
    if (!schedule) {
      return errorClientResponse(res, "Schedule not found", 404);
    }
    await Schedules.destroy({
      where: { sc_id: id },
    });
    return successResponse(res, "Delete Schedule Succes!");
  } catch (error) {
    return errorServerResponse(res, error.message);
  }
};

module.exports = {
  getAllSchedules,
  createSchedules,
  deleteSchedules,
  updateSchedule,
  updateIsDeleteSchedules,
  getByIdSchedules,
};
