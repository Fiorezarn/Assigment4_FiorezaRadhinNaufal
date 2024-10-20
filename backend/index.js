require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const userRouter = require("@/routes/users.route");
const coursesRouter = require("@/routes/courses.route");
const schedulesRouter = require("@/routes/schedules.route");
const expressListEndpoints = require("express-list-endpoints");

const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  const endpoints = expressListEndpoints(app);
  console.log("Available Endpoints:");
  endpoints.forEach((endpoint) => {
    console.log(`${endpoint.methods.join(", ")} ${endpoint.path}`);
  });
});

app.get("/", (req, res) => {
  return res.send("hello world");
});

const options = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: `${baseUrl}:${port}`,
      },
    ],
    info: {
      title: "Phincon Courses API",
      description:
        "This is the API documentation of the Phincon Courses to fulfill phincon academy assignment 4\n \nSome useful links:\n - [API Phincon Courses Documentation by Fioreza Radhin Naufal](https://github.com/Fiorezarn/Assigment4_FiorezaRadhinNaufal)\n - [Swagger Documentation](https://swagger.io/tools/swagger-ui/)",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

app.use("/users", userRouter);
app.use("/courses", coursesRouter);
app.use("/schedules", schedulesRouter);
