const { Users, Courses, Schedules, userCourses } = require("@/models");
const bcrypt = require("bcrypt");
const { generateToken } = require("@/controllers/token.controller");
const {
  successResponseData,
  successResponse,
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    return res.status(200).send({
      status: 200,
      message: "success",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const getAllUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      include: {
        model: Courses,
        as: "Courses",
        through: { attributes: [] },
        required: true,
        include: {
          model: Schedules,
          as: "Schedules",
          through: { attributes: [] },
          required: true,
        },
      },
      where: { us_id: id },
    });
    return res.status(200).send({
      status: 200,
      message: "success",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
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

    return res.status(201).send({
      status: 201,
      message: "success",
      newUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
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
        status: 404,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.us_password);
    if (!isPasswordValid) {
      return res.status(401).send({
        status: 401,
        message: "Invalid password",
      });
    }

    const loginToken = generateToken(user.us_id, user.us_email, "LOGIN", "1d");
    delete user.dataValues.us_password;
    user.dataValues.token = loginToken;
    const options = {
      expires: new Date(Number(new Date()) + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.cookie("user", user, options).status(200).send({
      status: "succes",
      code: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const registerCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const newCourse = await userCourses.create({
      uc_us_id: userId,
      uc_cr_id: courseId,
    });
    return res.status(201).send({
      status: 201,
      message: "success",
      newCourse,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  registerUsers,
  loginUsers,
  getAllUsersById,
  registerCourse,
};
