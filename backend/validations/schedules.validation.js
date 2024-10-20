const Joi = require("joi");
const { Schedules } = require("@/models");
const {
  errorClientResponse,
  errorServerResponse,
} = require("@/helpers/responseHelpers");

const bodyvalidation = async (req, res, next) => {
  const schema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    location: Joi.string().required(),
  });
  const validationError = schema.validate(req.body).error;
  if (validationError) {
    return errorClientResponse(res, validationError.details);
  }
  next();
};

const checkDuplicates = async (req, res, next) => {
  const { date, location } = req.body;
  try {
    const data = await Schedules.findOne({
      where: {
        sc_date: date,
        sc_location: location,
      },
    });
    if (data) {
      return errorClientResponse(res, `Schedule already exists`);
    }
    next();
  } catch (error) {
    return errorServerResponse(res, "Internal server error");
  }
};

module.exports = {
  bodyvalidation,
  checkDuplicates,
};
