const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyRoutes = require("./routes/companyRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const emailRoutes = require("./routes/emailRoutes");

const auth = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/reminders", reminderRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/profile", auth, (req, res, next) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

module.exports = app;
