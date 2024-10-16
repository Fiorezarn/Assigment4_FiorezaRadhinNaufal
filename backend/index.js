require("dotenv").config();
require("module-alias/register");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const userRouter = require("@/routes/users.route");
const coursesRouter = require("@/routes/courses.route");
const schedulesRouter = require("@/routes/schedules.route");
const cors = require("cors");
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.use("/users", userRouter);
app.use("/courses", coursesRouter);
app.use("/schedules", schedulesRouter);
