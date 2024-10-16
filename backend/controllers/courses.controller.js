const { Courses, Users, Schedules, CoursesSchedule } = require("@/models");
const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { get } = require("../routes/courses.route");
const { where } = require("sequelize");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.findAll({
      attributes: [
        "cr_id",
        "cr_name",
        "cr_code",
        "cr_price",
        "cr_desc",
        "cr_image",
      ],
      include: [
        {
          attributes: ["us_id", "us_fullname", "us_username", "us_email"],
          model: Users,
          as: "Users",
          through: { attributes: [] },
        },
        {
          attributes: ["sc_id", "sc_date", "sc_location"],
          model: Schedules,
          as: "Schedules",
          through: { attributes: [] },
        },
      ],
    });
    return successResponseData(res, "Success get all data!", courses, 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const findById = async (id) => {
  try {
    const courses = await Courses.findOne({
      where: { cr_id: id },
    });
    return courses;
  } catch (error) {
    return error;
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await findById(id);
    if (!courses) {
      return errorClientResponse(res, "Courses not found", 404);
    }

    const scheduleCourse = await Courses.findOne({
      attributes: [
        "cr_id",
        "cr_name",
        "cr_code",
        "cr_price",
        "cr_desc",
        "cr_image",
      ],
      include: [
        {
          attributes: ["us_id", "us_fullname", "us_username", "us_email"],
          model: Users,
          as: "Users",
          through: { attributes: [] },
        },
        {
          attributes: ["sc_id", "sc_date", "sc_location"],
          model: Schedules,
          as: "Schedules",
          through: { attributes: [] },
        },
      ],
      where: { cr_id: id },
    });

    return successResponseData(
      res,
      `Success get data with ${id}!`,
      scheduleCourse,
      200
    );
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const findScheduleCourseById = async (id) => {
  try {
    const scheduleCourse = await CoursesSchedule.findOne({
      where: { cs_id: id },
    });
    return scheduleCourse;
  } catch (error) {
    return errorServerResponse(res, "Failed get product");
  }
};

const createCourses = async (req, res) => {
  try {
    const { name, code, price, desc } = req.body;
    let image = req.file.path;
    let newImage = image.split("\\");
    newImage.shift();

    const newCourses = await Courses.create({
      cr_name: name,
      cr_code: code,
      cr_price: price,
      cr_desc: desc,
      cr_image: newImage.join("\\"),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).send({
      status: 201,
      message: "Create Courses Succes!",
      newCourses,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const addCourseSchedule = async (req, res) => {
  try {
    const { courseId, scheduleId } = req.body;
    const newScheduleCourse = await CoursesSchedule.create({
      cs_cr_id: courseId,
      cs_sc_id: scheduleId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return successResponseData(
      res,
      "Create Course Schedule Succes!",
      newScheduleCourse,
      201
    );
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const changeScheduleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleCourse = await findScheduleCourseById(id);
    if (!scheduleCourse) {
      return errorClientResponse(res, "Schedule Course not found", 404);
    }

    await CoursesSchedule.update(
      {
        cs_cr_id: req.body.courseId,
        cs_sc_id: req.body.scheduleId,
        updatedAt: new Date(),
      },
      {
        where: { cs_id: id },
      }
    );

    return successResponseData(
      res,
      "Update Schedule Course Succes!",
      scheduleCourse,
      200
    );
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await findById(id);
    const { name, code, price, desc } = req.body;
    const image = req.file.path;

    if (!course) {
      return res.status(404).send({
        status: 404,
        message: "Course not found",
      });
    }

    await Courses.update(
      {
        cr_name: name,
        cr_code: code,
        cr_price: price,
        cr_desc: desc,
        cr_image: image,
        updatedAt: new Date(),
      },
      {
        where: { cr_id: id },
      }
    );

    return res.status(200).send({
      status: 200,
      message: "Update Course Succes!",
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
module.exports = {
  getAllCourses,
  createCourses,
  updateCourses,
  addCourseSchedule,
  changeScheduleCourse,
  getCourseById,
};
