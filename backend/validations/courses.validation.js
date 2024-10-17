const Joi = require("joi");
const { Courses } = require("@/models");
const {
  errorServerResponse,
  errorClientResponse,
} = require("@/helpers/responseHelpers");

const bodyvalidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    price: Joi.number().required(),
    desc: Joi.string().required(),
  });
  const validationError = schema.validate(req.body).error;
  if (validationError) {
    return errorClientResponse(res, validationError.details);
  }
  next();
};

const checkDuplicates = async (req, res, next) => {
  const { name } = req.body;
  try {
    console.log(name, "data nih");
    const data = await Courses.findOne({
      where: { cr_name: name },
    });

    if (data) {
      return errorClientResponse(res, `Course with ${name} already exists`);
    }
    next();
  } catch (error) {
    console.log(error);
    return errorServerResponse(res, "Internal server error");
  }
};

module.exports = {
  bodyvalidation,
  checkDuplicates,
};
