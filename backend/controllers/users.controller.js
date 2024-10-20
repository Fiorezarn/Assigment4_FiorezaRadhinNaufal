const { Users, Courses, Schedules, userCourses } = require("@/models");
const bcrypt = require("bcrypt");
const { generateToken } = require("@/controllers/token.controller");
const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const whereCondition = search
      ? { us_fullname: { [Op.like]: `%${search}%` } }
      : {};
    const users = await Users.findAll({
      attributes: ["us_id", "us_fullname", "us_username", "us_email"],
      include: {
        model: Courses,
        as: "Courses",
        through: { attributes: [] },
        include: {
          model: Schedules,
          as: "Schedules",
          through: { attributes: [] },
        },
      },
      where: whereCondition,
    });
    return successResponseData(res, "Success get all data!", users, 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const findByIdUser = async (id) => {
  try {
    const user = await Users.findOne({
      attributes: ["us_id", "us_fullname", "us_username", "us_email"],
      where: { us_id: id },
      include: [
        {
          attributes: [
            "cr_id",
            "cr_name",
            "cr_code",
            "cr_price",
            "cr_desc",
            "cr_image",
          ],
          model: Courses,
          as: "Courses",
          through: { attributes: [] },
          include: [
            {
              attributes: ["sc_id", "sc_date", "sc_location"],
              model: Schedules,
              as: "Schedules",
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    return user;
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findByIdUser(id);
    return successResponseData(res, "Success get all data!", user, 200);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const registerUsers = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const newUser = await Users.create({
      us_fullname: fullname,
      us_username: username,
      us_email: email,
      us_password: await bcrypt.hash(password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return successResponseData(res, "Success create new user!", newUser, 201);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const loginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: { us_username: username },
    });

    if (!user) {
      return res.status(404).send({
        code: 404,
        status: "Failed",
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.us_password);
    if (!isPasswordValid) {
      return res.status(401).send({
        code: 401,
        status: "Failed",
        message: "Invalid password",
      });
    }

    const loginToken = generateToken(user.us_id, user.us_email, "LOGIN", "1d");
    delete user.dataValues.us_password;
    user.dataValues.token = loginToken;
    const options = {
      expires: new Date(Number(new Date()) + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    return res.cookie("user", JSON.stringify(user), options).status(200).send({
      code: 200,
      status: "succes",
      message: "Login success",
      data: user,
    });
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const registerCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const newCourse = await userCourses.create({
      uc_us_id: userId,
      uc_cr_id: courseId,
    });
    return successResponseData(res, "Success Register Course!", newCourse, 201);
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, username, email, password } = req.body;
    const dataUser = await findByIdUser(id);
    if (!dataUser) {
      return errorClientResponse(res, "User not found", 404);
    }
    await Users.update(
      {
        us_fullname: fullname,
        us_username: username,
        us_email: email,
        us_password: await bcrypt.hash(password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        where: { us_id: id },
      }
    );
    return successResponse(res, "Success update user!");
  } catch (error) {
    console.log(error);
    errorServerResponse(res, error.message, 500);
  }
};

const updateisDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isDeleted } = req.body;
    const dataUser = await findByIdUser(id);
    if (!dataUser) {
      return errorClientResponse(res, "User not found", 404);
    }
    await Users.update(
      {
        isDeleted: isDeleted,
      },
      {
        where: { us_id: id },
      }
    );
    return successResponse(res, "Success update user!");
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await findByIdUser(id);
    if (!dataUser) {
      return errorClientResponse(res, "User not found", 404);
    }
    await Users.destroy({
      where: { us_id: id },
    });
    return successResponse(res, "Success delete user!");
  } catch (error) {
    return errorServerResponse(res, error.message, 500);
  }
};

module.exports = {
  getAllUsers,
  registerUsers,
  loginUsers,
  getUsersById,
  registerCourse,
  updateisDeleteUser,
  deleteUser,
  updateUsers,
};
