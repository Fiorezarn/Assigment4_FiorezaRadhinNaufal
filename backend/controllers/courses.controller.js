const {
  Courses,
  Users,
  Schedules,
  CoursesSchedule,
  userCourses,
} = require("@/models");
const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { Op } = require("sequelize");

const getAllCourses = async (req, res) => {
  try {
    const { search } = req.query;
    const whereCondition = search
      ? { cr_name: { [Op.like]: `%${search}%` } }
      : {};
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
      where: whereCondition,
    });
    return successResponseData(res, "Success get all data!", courses, 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const findByIdCourse = async (id) => {
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
    const courses = await findByIdCourse(id);
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
    return successResponseData(res, "Create Courses Succes!", newCourses, 201);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
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

    return successResponse(res, "Update Schedule Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await findByIdCourse(id);
    const { name, code, price, desc } = req.body;
    let image = req.file.path;
    let newImage = image.split("\\");
    newImage.shift();

    if (!course) {
      return errorClientResponse(res, "Course not found", 404);
    }

    await Courses.update(
      {
        cr_name: name,
        cr_code: code,
        cr_price: price,
        cr_desc: desc,
        cr_image: newImage.join("\\"),
        updatedAt: new Date(),
      },
      {
        where: { cr_id: id },
      }
    );
    return successResponse(res, "Update Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateIsDeleteCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const course = await findByIdCourse(id);
    if (!course) {
      return errorClientResponse(res, "Course not found", 404);
    }
    await Courses.update(
      {
        isDeleted: isDeleted,
        updatedAt: new Date(),
      },
      {
        where: { cr_id: id },
      }
    );
    return successResponse(res, "Delete Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateIsDeleteCoursesSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const CoursesSchedule = await findScheduleCourseById(id);
    if (!CoursesSchedule) {
      return errorClientResponse(res, "Course not found", 404);
    }
    await CoursesSchedule.update(
      {
        isDeleted: isDeleted,
        updatedAt: new Date(),
      },
      {
        where: { cs_id: id },
      }
    );
    return successResponse(res, "Delete Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const deleteCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await findByIdCourse(id);
    if (!course) {
      return errorClientResponse(res, "Course not found", 404);
    }
    await Courses.destroy({
      where: { cr_id: id },
    });
    return successResponse(res, "Delete Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const deleteCourseSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const coursesSchedule = await findScheduleCourseById(id);
    if (!coursesSchedule) {
      return errorClientResponse(res, "Course not found", 404);
    }
    await CoursesSchedule.destroy({
      where: { cs_id: id },
    });
    return successResponse(res, "Delete Course Succes!", 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

module.exports = {
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
};
