const Joi = require("joi");
const { Users, userCourses } = require("@/models");
const {
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");

const bodyvalidationUsers = async (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).alphanum().required(),
  });
  const validationError = schema.validate(req.body).error;

  if (validationError) {
    return errorClientResponse(res, validationError.details[0].message);
  }
  next();
};

const bodyValidationUsersCourse = async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    courseId: Joi.number().required(),
  });
  const validationError = schema.validate(req.body).error;
  if (validationError) {
    return errorClientResponse(res, validationError.details[0].message);
  }
  next();
};

const checkRegisterCourse = async (req, res, next) => {
  const { userId, courseId } = req.body;
  try {
    const data = await userCourses.findOne({
      where: { uc_us_id: userId, uc_cr_id: courseId },
    });
    if (data) {
      return errorClientResponse(res, `Course already registered`);
    }
    next();
  } catch (error) {
    return errorServerResponse(res, "Internal server error");
  }
};

const checkDuplicates = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const name = await Users.findOne({
      where: { us_username: username },
    });

    const dataEmail = await Users.findOne({
      where: { us_email: email },
    });

    if (name) {
      return errorClientResponse(res, `User with ${username} already exists`);
    }
    if (dataEmail) {
      return errorClientResponse(res, `Email ${email} is already taken`);
    }
    next();
  } catch (error) {
    return errorServerResponse(res, "Internal server error");
  }
};

module.exports = {
  bodyvalidationUsers,
  bodyValidationUsersCourse,
  checkRegisterCourse,
  checkDuplicates,
};
