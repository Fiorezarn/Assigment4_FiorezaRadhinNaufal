const jwt = require("jsonwebtoken");
const { User } = require("@/models");

const columns = {
  id: "us_id",
  email: "us_email",
  active: "us_active",
};

const generateToken = (id, email, name, expiresIn) => {
  const token = jwt.sign(
    { [columns.id]: id, [columns.email]: email, name: name },
    process.env.JWT_SECRET,
    {
      expiresIn: expiresIn,
    }
  );
  return token;
};

module.exports = { generateToken };
